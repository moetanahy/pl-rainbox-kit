import React, { useState, useEffect } from 'react';
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
} from '@chakra-ui/react';

const ExchangeComponent = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EGP');
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [rate, setRate] = useState(0);

  // Dummy exchange rates (replace with real API call in production)
  const rates = {
    USD: { EGP: 30.90 },
    EGP: { USD: 1 / 30.90 },
  };

  useEffect(() => {
    setRate(rates[fromCurrency][toCurrency]);
  }, [fromCurrency, toCurrency]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const handleConvert = () => {
    const converted = parseFloat(amount) * rate;
    setConvertedAmount(converted.toFixed(2));
  };

  return (
    <Box maxWidth="400px" margin="auto" mt={8} p={6} borderWidth={1} borderRadius="lg">
      <VStack spacing={4} align="stretch">
        <Heading size="md" textAlign="center">Currency Exchange</Heading>
        
        <HStack>
          <Select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
            <option value="USD">USD</option>
            <option value="EGP">EGP</option>
          </Select>
          <Input
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
          />
        </HStack>

        <Button onClick={handleSwap}>↑↓</Button>

        <HStack>
          <Select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
            <option value="USD">USD</option>
            <option value="EGP">EGP</option>
          </Select>
          <Input value={convertedAmount} isReadOnly placeholder="Converted amount" />
        </HStack>

        <Button colorScheme="blue" onClick={handleConvert}>Convert</Button>

        <Divider />

        <Text textAlign="center">
          Exchange Rate: 1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
        </Text>
      </VStack>
    </Box>
  );
};

export default ExchangeComponent;