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
  Card,
  CardBody,
  Icon,
} from '@chakra-ui/react';
import { FaExchangeAlt } from 'react-icons/fa';

const ExchangeComponent = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EGP');
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [rate, setRate] = useState(0);
  const [transferFee, setTransferFee] = useState(0);
  const [liquidityFee, setLiquidityFee] = useState(0);
  const [estimatedReceived, setEstimatedReceived] = useState(0);

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
    
    // Calculate fees and estimated received amount
    const transfer = converted * 0.01; // 1% transfer fee
    const liquidity = converted * 0.005; // 0.5% liquidity fee
    const estimated = converted - transfer - liquidity;
    
    setTransferFee(transfer.toFixed(2));
    setLiquidityFee(liquidity.toFixed(2));
    setEstimatedReceived(estimated.toFixed(2));
  };

  return (
    <Card boxShadow="md" borderRadius="lg" bg="white">
      <CardBody>
        <Box maxWidth="400px" margin="auto" mt={8} p={6} borderWidth={1} borderRadius="lg">
          <VStack spacing={6} align="stretch">
            <Heading size="lg" textAlign="center" color="gray.800" mb={2}>Send Money</Heading>
            <HStack>
              <Select 
                value={fromCurrency} 
                onChange={(e) => setFromCurrency(e.target.value)} 
                color="gray.800"
                borderColor="gray.300"
                _hover={{ borderColor: "gray.400" }}
              >
                <option value="USD">USD</option>
                <option value="EGP">EGP</option>
              </Select>
              <Input
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                color="gray.800"
                borderColor="gray.300"
                _hover={{ borderColor: "gray.400" }}
                _placeholder={{ color: "gray.500" }}
              />
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
                onChange={(e) => setToCurrency(e.target.value)} 
                color="gray.800"
                borderColor="gray.300"
                _hover={{ borderColor: "gray.400" }}
              >
                <option value="USD">USD</option>
                <option value="EGP">EGP</option>
              </Select>
              <Input 
                value={convertedAmount} 
                isReadOnly 
                placeholder="Converted amount" 
                color="gray.800"
                borderColor="gray.300"
                _hover={{ borderColor: "gray.400" }}
                _placeholder={{ color: "gray.500" }}
              />
            </HStack>

            <VStack align="stretch" spacing={2} mt={2}>
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.600">Transfer Fee:</Text>
                <Text fontSize="sm" color="gray.800">{transferFee} {toCurrency}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="sm" color="gray.600">Liquidity Fee:</Text>
                <Text fontSize="sm" color="gray.800">{liquidityFee} {toCurrency}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="sm" fontWeight="bold" color="gray.700">Estimated Received:</Text>
                <Text fontSize="sm" fontWeight="bold" color="gray.800">{estimatedReceived} {toCurrency}</Text>
              </HStack>
            </VStack>

            <Button 
              onClick={handleConvert} 
              bg="#15263e" 
              color="white" 
              _hover={{ bg: "#1e3a5c" }}
            >
              Convert
            </Button>

            <Divider />

            <Text textAlign="center" color="gray.800">
              Exchange Rate: 1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
            </Text>
          </VStack>
        </Box>
      </CardBody>
    </Card>
  );
};

export default ExchangeComponent;