import { ethers } from 'ethers';

// Add the SupportedCurrencies enum
export enum SupportedCurrencies {
  EGP = 'EGP',
  USD = 'USD'
}

interface ExchangeResult {
  exchangeRate: number;
  liquidityFee: number;
  transactionFee: number;
  estimatedReceiveAmount: number;
}

export class EstimatedUtility {
  private contract: ethers.Contract;
  private provider: ethers.JsonRpcProvider;

  constructor() {
    // Initialize provider (you might want to use a different provider based on your setup)
    this.provider = new ethers.JsonRpcProvider('https://rpc-evm-sidechain.xrpl.org');
    
    // Contract address
    const contractAddress = '0xa64Cb032fdf586E396AC3FbC7d7828DdeF2554bf';
    
    // ABI (Application Binary Interface) - You'll need to provide the ABI for your contract
    const abi = [
      // Add the ABI for the getExchangeRate function here
      "function getExchangeRate(string memory fromCurrency, string memory toCurrency) public view returns (uint256)"
    ];

    // Initialize contract
    this.contract = new ethers.Contract(contractAddress, abi, this.provider);
  }

  // Mock fee percentages (replace with real calculations in production)
  private liquidityFeePercentage = 0.003; // 0.3%
  private transactionFeePercentage = 0.001; // 0.1%

  public async estimateExchange(
    sendAmount: number,
    sendCurrency: SupportedCurrencies,
    receiveCurrency: SupportedCurrencies
  ): Promise<ExchangeResult> {
    try {
      // Get exchange rate from the smart contract
      const exchangeRateBN = await this.contract.getExchangeRate(sendCurrency, receiveCurrency);
      console.log("Exchange rate BN")
      console.log(exchangeRateBN)
      const exchangeRate = parseFloat(ethers.formatUnits(exchangeRateBN, 4)); // Assuming 4 decimals
      console.log("exchangeRate")
      console.log(exchangeRate)

      const convertedAmount = sendAmount * exchangeRate;

      const liquidityFee = convertedAmount * this.liquidityFeePercentage;
      const transactionFee = convertedAmount * this.transactionFeePercentage;

      const estimatedReceiveAmount = convertedAmount - liquidityFee - transactionFee;

      return {
        exchangeRate,
        liquidityFee,
        transactionFee,
        estimatedReceiveAmount,
      };
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
      throw error;
    }
  }

  public formatCurrency(amount: number, currency: SupportedCurrencies): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  }
}