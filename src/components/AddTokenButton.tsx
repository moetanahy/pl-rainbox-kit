import React from 'react';
import { IconButton, useToast } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useAccount } from 'wagmi';

interface AddTokenButtonProps {
  tokenSymbol: string;
  tokenAddress: string;
}

const AddTokenButton: React.FC<AddTokenButtonProps> = ({ tokenSymbol, tokenAddress }) => {
  const { isConnected } = useAccount();
  const toast = useToast();

  const addTokenToMetaMask = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: tokenAddress,
              symbol: tokenSymbol,
              decimals: 2, // Assuming 18 decimals, adjust if different
              image: '', // Add token image URL if available
            },
          },
        });
        toast({
          title: "Success",
          description: `${tokenSymbol} has been added to your MetaMask wallet`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Error adding token to MetaMask:', error);
        toast({
          title: "Error",
          description: "Failed to add token to MetaMask",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Error",
        description: "MetaMask is not installed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <IconButton
      aria-label="Add token to MetaMask"
      icon={<AddIcon />}
      size="xs"
      backgroundColor="#15263e"
      color="white"
      _hover={{ backgroundColor: "#1e3a5f" }}
      onClick={addTokenToMetaMask}
      isDisabled={!isConnected}
    />
  );
};

export default AddTokenButton;