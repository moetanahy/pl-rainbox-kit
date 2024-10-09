import { ethers } from 'ethers';

const walletAddresses = {
  PL_DAZU_Treasury: '0x28E1CbD9d3a90Dc11492a93ceb87F5bE3DD4FE6a',
  PL_USA_User: '0xA2e8AD3B06196346674C58cc566F41D3483E9999',
  PL_USA_LP: '0xCe4e69DAeD97b7980Dd851F9b85359ab002583B9',
  PL_EG_User: '0xC134b6659126EF0CA46D14C73F6E771D57B873D7',
  PL_EG_LP: '0xCa37fe99BdB92520159c25AAA6a65E43Abb202aF'
};

function isAllowedToSeed(address: string): boolean {
  return address.toLowerCase() === walletAddresses.PL_DAZU_Treasury.toLowerCase();
}
