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
    const contractAddress = '0x1C22A7a205A2377211158111656fc6E3ffe0A612';
    
    // Updated ABI with the correct function signature
    const abi = [
      "function getExchangeRate(string memory fromCurrency, string memory toCurrency) public view returns (uint256)",
      "function calculateLiquidityProviderFeePublic(uint256 amount, string memory toCurrencyISO) public view returns (uint256)"
    ];

    // Initialize contract
    this.contract = new ethers.Contract(contractAddress, abi, this.provider);
  }

  // Mock transaction fee percentage (replace with real calculations in production)
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
      const exchangeRate = parseFloat(ethers.formatUnits(exchangeRateBN, 2)); // Assuming 4 decimals
      console.log("exchangeRate")
      console.log(exchangeRate)

      const convertedAmount = sendAmount * exchangeRate;
      console.log("convertedAmount")
      console.log(convertedAmount)

      const parsedUnits = Math.trunc(convertedAmount * 100)
      console.log("parsedUnits")
      console.log(parsedUnits)

      // Calculate liquidity fee using the updated smart contract function
      const liquidityFeeBN = await this.contract.calculateLiquidityProviderFeePublic(
        // ethers.parseUnits(convertedAmount.toString(), 2),
        parsedUnits,
        receiveCurrency
      );
      console.log("liquidityFeeBN")
      console.log(liquidityFeeBN)
      const liquidityFee = parseFloat(ethers.formatUnits(liquidityFeeBN, 2)) / 100;

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