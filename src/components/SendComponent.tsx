import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Box,
  Select,
  Input,
  Button,
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
  InputGroup,
  InputLeftElement,
  useToast,
} from '@chakra-ui/react';
import { EstimatedUtility, SupportedCurrencies } from '../utils/EstimatedUtility';
import { getWalletTitle, walletAddresses, getCountry } from '../utils/WalletUtils';
import { sendFunds } from '../utils/SendUtils';
import { useAccount } from 'wagmi';

const SendComponent = () => {
  const [fromCurrency, setFromCurrency] = useState<SupportedCurrencies>(SupportedCurrencies.USD);
  const [amount, setAmount] = useState('');
  const [selectedFriend, setSelectedFriend] = useState('');
  const [transferFee, setTransferFee] = useState(0);
  const [liquidityFee, setLiquidityFee] = useState(0);
  const [estimatedReceived, setEstimatedReceived] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { address } = useAccount();
  const [myCountry, setMyCountry] = useState('');
  const [myWalletName, setMyWalletName] = useState('');
  const [destinationCountry, setDestinationCountry] = useState('');

  const estimatedUtility = new EstimatedUtility();
  const toast = useToast();

  const getCurrencySymbol = (currency: SupportedCurrencies): string => {
    switch (currency) {
      case SupportedCurrencies.USD:
        return '$';
      case SupportedCurrencies.EGP:
        return 'E£';
      default:
        return '';
    }
  };

  const formatAmount = (value: number, currency: SupportedCurrencies): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const handleEstimate = useCallback(async () => {
    const amountNumber = parseFloat(amount);
    if (isNaN(amountNumber) || amountNumber <= 0) {
      setTransferFee(0);
      setLiquidityFee(0);
      setEstimatedReceived(0);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await estimatedUtility.estimateExchange(amountNumber, fromCurrency, fromCurrency);
      
      setTransferFee(result.transactionFee);
      setLiquidityFee(result.liquidityFee);
      setEstimatedReceived(result.estimatedReceiveAmount);
    } catch (error) {
      console.error('Error during estimation:', error);
      setError('An error occurred during estimation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [amount, fromCurrency]);

  useEffect(() => {
    if (amount && fromCurrency) {
      handleEstimate();
    }
  }, [amount, fromCurrency, handleEstimate]);

  useEffect(() => {
    if (address) {
      const walletTitle = getWalletTitle(address);
      setMyWalletName(walletTitle);
      const country = getCountry(walletTitle);
      setMyCountry(country);
    }
  }, [address]);

  useEffect(() => {
    if (selectedFriend) {
      const friendWalletTitle = getWalletTitle(selectedFriend);
      const country = getCountry(friendWalletTitle);
      setDestinationCountry(country);
    } else {
      setDestinationCountry('');
    }
  }, [selectedFriend]);

  const filteredWalletOptions = useMemo(() => {
    return Object.entries(walletAddresses).filter(([title, address]) => {
      const country = getCountry(title);
      return (country === 'USA' || country === 'Egypt') && title !== myWalletName;
    });
  }, [myWalletName]);

  const handleSend = async () => {
    if (!selectedFriend || !amount) {
      toast({
        title: "Error",
        description: "Please select a friend and enter an amount.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      await sendFunds(selectedFriend, parseFloat(amount), fromCurrency);
      toast({
        title: "Success",
        description: `Successfully sent ${amount} ${fromCurrency} to ${getWalletTitle(selectedFriend)}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Reset form
      setAmount('');
      setSelectedFriend('');
    } catch (error) {
      console.error('Error sending funds:', error);
      toast({
        title: "Error",
        description: "Failed to send funds. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box width="100%" maxWidth="1000px" margin="auto">
      <Card boxShadow="md" borderRadius="lg" bg="white" width="100%">
        <CardBody>
          <Box margin="auto" mt={8} p={6} borderWidth={1} borderRadius="lg">
            <VStack spacing={6} align="stretch">
              <HStack justify="space-between">
                <Text fontSize="md" fontWeight="bold" color="gray.700">My Country:</Text>
                <Text fontSize="md" color="gray.800">{myCountry}</Text>
              </HStack>

              <HStack justify="space-between">
                <Text fontSize="md" fontWeight="bold" color="gray.700">Name:</Text>
                <Text fontSize="md" color="gray.800">{myWalletName}</Text>
              </HStack>

              <HStack spacing={4} align="center" justify="space-between">
                <Text fontSize="md" fontWeight="bold" color="gray.700" width="20%">Sending:</Text>
                <Select 
                  value={fromCurrency} 
                  onChange={(e) => setFromCurrency(e.target.value as SupportedCurrencies)} 
                  color="gray.800"
                  borderColor="gray.300"
                  _hover={{ borderColor: "gray.400" }}
                  width="25%"
                >
                  {Object.values(SupportedCurrencies).map((currency) => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))}
                </Select>

                <InputGroup width="55%">
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.500"
                    fontSize="1.2em"
                    children={getCurrencySymbol(fromCurrency)}
                  />
                  <Input
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    color="gray.800"
                    borderColor="gray.300"
                    _hover={{ borderColor: "gray.400" }}
                    _placeholder={{ color: "gray.500" }}
                    pl="2rem"
                  />
                </InputGroup>
              </HStack>

              <HStack spacing={4} align="center" justify="space-between">
                <Text fontSize="md" fontWeight="bold" color="gray.700" width="20%">Sending to:</Text>
                <Box width="70%">
                  <Select
                    placeholder="Select friend"
                    value={selectedFriend}
                    onChange={(e) => setSelectedFriend(e.target.value)}
                    color="gray.800"
                    borderColor="gray.300"
                    _hover={{ borderColor: "gray.400" }}
                    width="100%"
                  >
                    {filteredWalletOptions.map(([title, address]) => (
                      <option key={address} value={address}>{title}</option>
                    ))}
                  </Select>
                </Box>
              </HStack>

              <HStack spacing={4} align="center" justify="space-between">
                <Text fontSize="md" fontWeight="bold" color="gray.700" width="30%">Destination Country:</Text>
                <Box width="60%" textAlign="right">
                  <Text fontSize="md" color="gray.800">{destinationCountry}</Text>
                </Box>
              </HStack>

              <VStack align="stretch" spacing={2} mt={2}>
                <HStack justify="space-between">
                  <Text fontSize="sm" color="gray.600">Transfer Fee:</Text>
                  <Text fontSize="sm" color="gray.800">{formatAmount(transferFee, fromCurrency)}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text fontSize="sm" color="gray.600">Liquidity Fee:</Text>
                  <Text fontSize="sm" color="gray.800">{formatAmount(liquidityFee, fromCurrency)}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text fontSize="sm" fontWeight="bold" color="gray.700">Estimated Received:</Text>
                  <Text fontSize="sm" fontWeight="bold" color="gray.800">{formatAmount(estimatedReceived, fromCurrency)}</Text>
                </HStack>
              </VStack>

              {isLoading && <Text>Loading...</Text>}
              {error && <Text color="red.500">{error}</Text>}

              <Button 
                onClick={handleSend} 
                colorScheme="blue" 
                isLoading={isLoading}
                loadingText="Sending"
              >
                Send
              </Button>
            </VStack>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
};

export default SendComponent;