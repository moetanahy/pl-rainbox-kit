import { ethers } from 'ethers';

export interface Currency {
  isoCode: string;
  tokenSymbol: string;
  tokenAddress: string; // Add this line
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
    const contractAddress = '0x3De83c228003EEe62F6fD0ea621Acef9c5f6ea96';
    
    // Updated ABI with the correct function signature
    const abi = [
      "function getSupportedTokens() external view returns (tuple(string isoCode, string tokenSymbol, uint256 totalStaked, uint256 transactionFee, uint256 rewardsPool, uint8 feeTier)[])"
    ];

    // Initialize contract
    this.contract = new ethers.Contract(contractAddress, abi, this.provider);
  }

  public async getSupportedTokens(): Promise<Currency[]> {
    try {
      const supportedTokens = await this.contract.getSupportedTokens();

      console.log("supportedTokens", supportedTokens)

      return supportedTokens.map((token: any) => ({
        isoCode: token.isoCode,
        tokenSymbol: token.tokenSymbol,
        tokenAddress: token.tokenAddress,
        totalStaked: token.totalStaked,
        transactionFee: token.transactionFee,
        rewardsPool: token.rewardsPool,
        feeTier: token.feeTier
      }));
    } catch (error) {
      console.error('Error fetching supported tokens:', error);
      throw error;
    }
  }
}