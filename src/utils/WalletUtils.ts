import { ethers } from 'ethers';
import { parseUnits } from 'ethers';

export const walletAddresses = {
  PL_DAZU_Treasury: '0x28E1CbD9d3a90Dc11492a93ceb87F5bE3DD4FE6a',
  PL_USA_User: '0xA2e8AD3B06196346674C58cc566F41D3483E9999',
  PL_USA_LP: '0xCe4e69DAeD97b7980Dd851F9b85359ab002583B9',
  PL_EG_User: '0xC134b6659126EF0CA46D14C73F6E771D57B873D7',
  PL_EG_LP: '0xCa37fe99BdB92520159c25AAA6a65E43Abb202aF'
};

const tokenContracts = {
  USDz: '0xDe17F7656A1cBeECDBa37CB26D15F309C4FB8FEd',
  EGPz: '0x623E03DCB061E9e6ddb19c9D04575f0C6944e23F'
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

  const amount = parseUnits('10000', 18); // Assuming 2 decimals for both tokens

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

export async function seedUSALPAndUser(signer: ethers.Signer): Promise<void> {
  const signerAddress = await signer.getAddress();
  
  if (!isAllowedToSeed(signerAddress)) {
    throw new Error('Only the PL_DAZU_Treasury address is allowed to seed wallets');
  }

  const amount = parseUnits('10000', 18); // Assuming 18 decimals for USDz token
  const mintABI = ['function mint(address to, uint256 amount) external'];

  try {
    const usdzContract = new ethers.Contract(tokenContracts.USDz, mintABI, signer);

    // Mint 10000 USDz tokens for PL_USA_LP
    await usdzContract.mint(walletAddresses.PL_USA_LP, amount);
    console.log('Successfully minted 10000 USDz tokens to PL_USA_LP');

    // Mint 10000 USDz tokens for PL_USA_User
    await usdzContract.mint(walletAddresses.PL_USA_User, amount);
    console.log('Successfully minted 10000 USDz tokens to PL_USA_User');

  } catch (error) {
    console.error('Error seeding USA LP and User wallets:', error);
    throw error;
  }
}

export async function seedEgyptLPAndUser(signer: ethers.Signer): Promise<void> {
  const signerAddress = await signer.getAddress();
  
  if (!isAllowedToSeed(signerAddress)) {
    throw new Error('Only the PL_DAZU_Treasury address is allowed to seed wallets');
  }

  const amount = parseUnits('10000', 18); // Assuming 18 decimals for EGPz token
  const mintABI = ['function mint(address to, uint256 amount) external'];

  try {
    const egpzContract = new ethers.Contract(tokenContracts.EGPz, mintABI, signer);

    // Mint 10000 EGPz tokens for PL_EG_LP
    await egpzContract.mint(walletAddresses.PL_EG_LP, amount);
    console.log('Successfully minted 10000 EGPz tokens to PL_EG_LP');

    // Mint 10000 EGPz tokens for PL_EG_User
    await egpzContract.mint(walletAddresses.PL_EG_User, amount);
    console.log('Successfully minted 10000 EGPz tokens to PL_EG_User');

  } catch (error) {
    console.error('Error seeding Egypt LP and User wallets:', error);
    throw error;
  }
}

export async function seedWallets(signer: ethers.Signer): Promise<void> {
  try {
    await seedTreasury(signer);
    await seedUSALPAndUser(signer);
    await seedEgyptLPAndUser(signer);
    console.log('Successfully seeded all wallets');
  } catch (error) {
    console.error('Error seeding wallets:', error);
    throw error;
  }
}

export function getWalletTitle(address: string): string {
  const lowerCaseAddress = address.toLowerCase();
  for (const [title, walletAddress] of Object.entries(walletAddresses)) {
    if (walletAddress.toLowerCase() === lowerCaseAddress) {
      return title;
    }
  }
  return 'Unknown Wallet';
}

export function getCountry(walletName: string): string {
  if (walletName.includes('USA')) {
    return 'USA';
  } else if (walletName.includes('EG')) {
    return 'Egypt';
  }
  return 'ALL';
}