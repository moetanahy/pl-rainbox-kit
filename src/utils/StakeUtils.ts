import { ethers } from 'ethers';

export interface Currency {
  isoCode: string;
  tokenSymbol: string;
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
    const contractAddress = '0x7B08Bc47BE19d5F09a2CB3f4A41e55dA095f91F1';
    
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
      return supportedTokens.map((token: any) => ({
        isoCode: token.isoCode,
        tokenSymbol: token.tokenSymbol,
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