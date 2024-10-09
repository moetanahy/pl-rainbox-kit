import React, { useCallback } from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { isAllowedToSeed, seedWallets } from '../utils/WalletUtils';
import { useAccount, useWalletClient } from 'wagmi';
import { ethers } from 'ethers';

const SeederButton: React.FC = () => {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const toast = useToast();

  const handleSeed = useCallback(async () => {
    if (!walletClient) {
      toast({
        title: "Error",
        description: "No wallet client available",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(walletClient as any);
      const signer = await provider.getSigner();
      await seedWallets(signer);
      toast({
        title: "Success",
        description: "All wallets seeded successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error seeding wallets:', error);
      toast({
        title: "Error",
        description: "Failed to seed wallets",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [walletClient, toast]);

  if (!address || !isAllowedToSeed(address)) {
    return null;
  }

  return (
    <Button
      onClick={handleSeed}
      backgroundColor="#15263e"
      color="white"
      size="sm"
      _hover={{ backgroundColor: "#1e3a5f" }}
    >
      Seed All Wallets
    </Button>
  );
};

export default SeederButton;