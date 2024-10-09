import React, { useCallback } from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { isAllowedToSeed, seedTreasury } from '../utils/WalletUtils';
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
      await seedTreasury(signer);
      toast({
        title: "Success",
        description: "Treasury seeded successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error seeding treasury:', error);
      toast({
        title: "Error",
        description: "Failed to seed treasury",
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
      Seed Pools
    </Button>
  );
};

export default SeederButton;