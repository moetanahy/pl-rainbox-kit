import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Select,
  Input,
  Button,
  Text,
  VStack,
  HStack,
  Heading,
  Divider,
  Card,
  CardBody,
  Icon,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { FaExchangeAlt } from 'react-icons/fa';
import { EstimatedUtility, SupportedCurrencies } from '../utils/EstimatedUtility';

const ExchangeComponent = () => {
  const [fromCurrency, setFromCurrency] = useState<SupportedCurrencies>(SupportedCurrencies.USD);
  const [toCurrency, setToCurrency] = useState<SupportedCurrencies>(SupportedCurrencies.EGP);
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [rate, setRate] = useState(0);
  const [transferFee, setTransferFee] = useState(0);
  const [liquidityFee, setLiquidityFee] = useState(0);
  const [estimatedReceived, setEstimatedReceived] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [amountBeforeFees, setAmountBeforeFees] = useState(0);

  const estimatedUtility = new EstimatedUtility();

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

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setAmount(convertedAmount);
    setConvertedAmount('');
    resetValues();
  };

  const handleFromCurrencyChange = (newCurrency: SupportedCurrencies) => {
    setFromCurrency(newCurrency);
    if (newCurrency === toCurrency) {
      // Set toCurrency to the first available currency that's not the same as fromCurrency
      const newToCurrency = Object.values(SupportedCurrencies).find(currency => currency !== newCurrency);
      if (newToCurrency) setToCurrency(newToCurrency);
    }
    resetValues();
  };

  const handleToCurrencyChange = (newCurrency: SupportedCurrencies) => {
    setToCurrency(newCurrency);
    if (newCurrency === fromCurrency) {
      // Set fromCurrency to the first available currency that's not the same as toCurrency
      const newFromCurrency = Object.values(SupportedCurrencies).find(currency => currency !== newCurrency);
      if (newFromCurrency) setFromCurrency(newFromCurrency);
    }
    resetValues();
  };

  const resetValues = () => {
    setConvertedAmount('');
    setRate(0);
    setTransferFee(0);
    setLiquidityFee(0);
    setEstimatedReceived(0);
    setAmountBeforeFees(0);
  };

  const handleConvert = useCallback(async () => {
    const amountNumber = parseFloat(amount);
    if (isNaN(amountNumber) || amountNumber <= 0) {
      resetValues();
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await estimatedUtility.estimateExchange(amountNumber, fromCurrency, toCurrency);
      
      setRate(result.exchangeRate);
      setConvertedAmount(formatAmount(result.estimatedReceiveAmount, toCurrency));
      setTransferFee(result.transactionFee);
      setLiquidityFee(result.liquidityFee);
      setEstimatedReceived(result.estimatedReceiveAmount);
      // Calculate and set the amount before fees
      setAmountBeforeFees(amountNumber * result.exchangeRate);
    } catch (error) {
      console.error('Error during conversion:', error);
      setError('An error occurred during conversion. Please try again.');
      resetValues();
    } finally {
      setIsLoading(false);
    }
  }, [amount, fromCurrency, toCurrency]);

  useEffect(() => {
    if (amount && fromCurrency && toCurrency) {
      handleConvert();
    } else {
      resetValues();
    }
  }, [amount, fromCurrency, toCurrency, handleConvert]);

  return (
    <Card boxShadow="md" borderRadius="lg" bg="white">
      <CardBody>
        <Box maxWidth="400px" margin="auto" mt={8} p={6} borderWidth={1} borderRadius="lg">
          <VStack spacing={6} align="stretch">
            <Heading size="lg" textAlign="center" color="gray.800" mb={2}>Send Money</Heading>
            <HStack>
              <Select 
                value={fromCurrency} 
                onChange={(e) => handleFromCurrencyChange(e.target.value as SupportedCurrencies)} 
                color="gray.800"
                borderColor="gray.300"
                _hover={{ borderColor: "gray.400" }}
                width="90px"
              >
                {Object.values(SupportedCurrencies).map((currency) => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </Select>
              <InputGroup flex={1}>
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

            <Button 
              onClick={handleSwap} 
              aria-label="Swap currencies"
              bg="gray.100"
              _hover={{ bg: "gray.200" }}
              border="1px solid"
              borderColor="gray.300"
              boxShadow="sm"
              p={2}
              borderRadius="md"
            >
              <Icon as={FaExchangeAlt} color="blue.500" boxSize={5} />
            </Button>

            <HStack>
              <Select 
                value={toCurrency} 
                onChange={(e) => handleToCurrencyChange(e.target.value as SupportedCurrencies)} 
                color="gray.800"
                borderColor="gray.300"
                _hover={{ borderColor: "gray.400" }}
                width="90px"
              >
                {Object.values(SupportedCurrencies)
                  .filter(currency => currency !== fromCurrency)
                  .map((currency) => (
                    <option key={currency} value={currency}>{currency}</option>
                  ))
                }
              </Select>
              <InputGroup flex={1}>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.500"
                  fontSize="1.2em"
                  children={getCurrencySymbol(toCurrency)}
                />
                <Input 
                  value={convertedAmount} 
                  isReadOnly 
                  placeholder="Converted amount" 
                  color="gray.800"
                  borderColor="gray.300"
                  _hover={{ borderColor: "gray.400" }}
                  _placeholder={{ color: "gray.500" }}
                  pl="2rem"
                />
              </InputGroup>
            </HStack>

            <VStack align="stretch" spacing={2} mt={2}>
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.600">Amount before fees:</Text>
                <Text fontSize="sm" color="gray.800">{formatAmount(amountBeforeFees, toCurrency)}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.600">Transfer Fee:</Text>
                <Text fontSize="sm" color="gray.800">{formatAmount(transferFee, toCurrency)}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.600">Liquidity Fee:</Text>
                <Text fontSize="sm" color="gray.800">{formatAmount(liquidityFee, toCurrency)}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="sm" fontWeight="bold" color="gray.700">Estimated Received:</Text>
                <Text fontSize="sm" fontWeight="bold" color="gray.800">{formatAmount(estimatedReceived, toCurrency)}</Text>
              </HStack>
            </VStack>

            {isLoading && <Text>Loading...</Text>}
            {error && <Text color="red.500">{error}</Text>}

            <Divider />

            <Text textAlign="center" color="gray.800">
              Exchange Rate: 1 {fromCurrency} = {rate ? rate.toFixed(4) : '...'} {toCurrency}
            </Text>
          </VStack>
        </Box>
      </CardBody>
    </Card>
  );
};

export default ExchangeComponent;