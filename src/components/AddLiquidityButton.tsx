import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useAccount, useBalance } from 'wagmi';
import { StakeUtils } from '../utils/StakeUtils';
import { ethers } from 'ethers';

interface AddLiquidityButtonProps {
  tokenSymbol: string;
  tokenAddress: string;
}

const AddLiquidityButton: React.FC<AddLiquidityButtonProps> = ({ tokenSymbol, tokenAddress }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [amount, setAmount] = useState('');
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address: address as `0x${string}`,
    token: tokenAddress as `0x${string}`,
  });
  const toast = useToast();

  const handleStake = async () => {
    if (!address || !amount) return;

    try {
      const stakeUtils = new StakeUtils();
      await stakeUtils.stake(tokenAddress, ethers.parseUnits(amount, balance?.decimals));
      toast({
        title: 'Staking Successful',
        description: `You have successfully staked ${amount} ${tokenSymbol}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error('Staking error:', error);
      toast({
        title: 'Staking Failed',
        description: 'An error occurred while staking. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (!balance || balance.value === BigInt(0)) {
    return null;
  }

  return (
    <>
      <Button
        backgroundColor="#15263e"
        color="white"
        size="sm"
        _hover={{ backgroundColor: "#1e3a5f" }}
        onClick={onOpen}
      >
        Add Liquidity
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor="#f5f5f5">
          <ModalHeader color="black">Add Liquidity for {tokenSymbol}</ModalHeader>
          <ModalCloseButton color="black" />
          <ModalBody>
            <VStack spacing={4}>
              <Text color="black">Balance: {balance?.formatted} {tokenSymbol}</Text>
              <Input
                placeholder="Enter amount to stake"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                color="black"
                borderColor="gray.300"
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              backgroundColor="#15263e"
              color="white"
              _hover={{ backgroundColor: "#1e3a5f" }}
              mr={3}
              onClick={handleStake}
            >
              Stake
            </Button>
            <Button variant="ghost" onClick={onClose} color="black">Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddLiquidityButton;