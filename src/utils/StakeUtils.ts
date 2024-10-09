import { ethers } from 'ethers';

export interface Currency {
  isoCode: string;
  tokenSymbol: string;
  tokenAddress: string;
  totalStaked: ethers.BigNumberish;
  transactionFee: number;
  rewardsPool: ethers.BigNumberish;
  feeTier: number;
}

export class StakeUtils {
  private contract: ethers.Contract;
  private provider: ethers.JsonRpcProvider;

  constructor() {
    // Initialize provider (using the same RPC endpoint as in EstimatedUtility)
    this.provider = new ethers.JsonRpcProvider('https://rpc-evm-sidechain.xrpl.org');
    
    // Contract address
    const contractAddress = '0x1C22A7a205A2377211158111656fc6E3ffe0A612';
    
    // Updated ABI with the correct function signature
    const abi = [
      "function getSupportedTokens() external view returns (tuple(string isoCode, string tokenSymbol, address tokenAddress, uint256 totalStaked, uint256 transactionFee, uint256 rewardsPool, uint8 feeTier)[])"
    ];

    // Initialize contract
    this.contract = new ethers.Contract(contractAddress, abi, this.provider);
  }

  public async getSupportedTokens(): Promise<Currency[]> {
    try {
      const supportedTokens = await this.contract.getSupportedTokens();

    //   console.log("Raw supportedTokens data:", JSON.stringify(supportedTokens, null, 2));

      return supportedTokens.map((token: any) => {
        console.log("Processing token:", token);
        return {
          isoCode: token.isoCode,
          tokenSymbol: token.tokenSymbol,
          tokenAddress: token.tokenAddress,
          totalStaked: token.totalStaked,
          transactionFee: token.transactionFee,
          rewardsPool: token.rewardsPool,
          feeTier: token.feeTier
        };
      });
    } catch (error) {
      console.error('Error fetching supported tokens:', error);
      throw error;
    }
  }
}