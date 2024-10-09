import { ethers } from 'ethers';
import { parseUnits } from 'ethers';

const walletAddresses = {
  PL_DAZU_Treasury: '0x28E1CbD9d3a90Dc11492a93ceb87F5bE3DD4FE6a',
  PL_USA_User: '0xA2e8AD3B06196346674C58cc566F41D3483E9999',
  PL_USA_LP: '0xCe4e69DAeD97b7980Dd851F9b85359ab002583B9',
  PL_EG_User: '0xC134b6659126EF0CA46D14C73F6E771D57B873D7',
  PL_EG_LP: '0xCa37fe99BdB92520159c25AAA6a65E43Abb202aF'
};

const tokenContracts = {
  USDz: '0x7087e6bC6D9819eeE73286Dad0701f84C4bfe3ad',
  EGPz: '0x22E785edc39CC5D2fa79F82a51a9898232BEDe98'
};

export function isAllowedToSeed(address: string): boolean {
    console.log("address", address)
    console.log("walletAddresses.PL_DAZU_Treasury.toLowerCase()", walletAddresses.PL_DAZU_Treasury.toLowerCase())
    return address.toLowerCase() === walletAddresses.PL_DAZU_Treasury.toLowerCase();
}

export async function seedTreasury(signer: ethers.Signer): Promise<void> {
  const signerAddress = await signer.getAddress();
  
  if (!isAllowedToSeed(signerAddress)) {
    throw new Error('Only the PL_DAZU_Treasury address is allowed to seed the treasury');
  }

  const amount = parseUnits('10000', 2); // Assuming 2 decimals for both tokens

  const mintABI = ['function mint(address to, uint256 amount) external'];

  try {
    const usdzContract = new ethers.Contract(tokenContracts.USDz, mintABI, signer);
    await usdzContract.mint(walletAddresses.PL_DAZU_Treasury, amount);
    console.log('Successfully minted 10000 USDz tokens to PL_DAZU_Treasury');

    const egpzContract = new ethers.Contract(tokenContracts.EGPz, mintABI, signer);
    await egpzContract.mint(walletAddresses.PL_DAZU_Treasury, amount);
    console.log('Successfully minted 10000 EGPz tokens to PL_DAZU_Treasury');
  } catch (error) {
    console.error('Error seeding treasury:', error);
    throw error;
  }
}