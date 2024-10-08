import { BigNumber } from 'ethers';

// ... other existing types

export interface TokenInfo {
  symbol: string;
  name: string;
  totalStaked: BigNumber;
  apr: number;
}