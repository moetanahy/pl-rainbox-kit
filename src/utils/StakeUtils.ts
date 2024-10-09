import { ethers } from 'ethers';

import abi from './abi.json';

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

  private contractAddress = '0x826999eE44Ad8B5a94B4A04315C316D61c009C8f';

  constructor() {
    // Initialize provider (using the same RPC endpoint as in EstimatedUtility)
    this.provider = new ethers.JsonRpcProvider('https://rpc-evm-sidechain.xrpl.org');
    
    // Contract address
    // const contractAddress = '0x826999eE44Ad8B5a94B4A04315C316D61c009C8f';
    
    // Updated ABI with the correct function signature
    // const abi = [
    //   "function getSupportedTokens() external view returns (tuple(string isoCode, string tokenSymbol, address tokenAddress, uint256 totalStaked, uint256 transactionFee, uint256 rewardsPool, uint8 feeTier)[])",
    //   "function stake(address token, uint256 amount) external"
    // ];    


    // Initialize contract
    this.contract = new ethers.Contract(this.contractAddress, abi, this.provider);
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

  public async stake(tokenAddress: string, amount: ethers.BigNumberish): Promise<void> {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Token contract instance
      const tokenContract = new ethers.Contract(
        tokenAddress,
        ['function approve(address spender, uint256 amount) public returns (bool)'],
        signer
      );
  
      // Staking contract instance
      const stakingContract = new ethers.Contract(this.contractAddress, abi, signer);
  
      console.log('Approving tokens...');
      const approveTx = await tokenContract.approve(this.contractAddress, amount);
      await approveTx.wait();
      console.log('Approval successful');
  
      console.log('Staking tokens...');
      const stakeTx = await stakingContract.stake(tokenAddress, amount);
      await stakeTx.wait();
      console.log('Staking successful');
    } catch (error) {
      console.error('Error staking tokens:', error);
      throw error;
    }
  }
}