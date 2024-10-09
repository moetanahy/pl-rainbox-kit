import React, { useState, useEffect } from 'react';
import { Box, VStack, Text, Spinner, Flex } from '@chakra-ui/react';
import { useAccount, useBalance } from 'wagmi';
import { StakeUtils, Currency } from '../utils/StakeUtils';

const BalancesWidget: React.FC = () => {
  const { address, isConnected } = useAccount();
  const [tokens, setTokens] = useState<Currency[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokens = async () => {
      if (isConnected) {
        try {
          const stakeUtils = new StakeUtils();
          const supportedTokens = await stakeUtils.getSupportedTokens();
          setTokens(supportedTokens);
        } catch (error) {
          console.error('Error fetching supported tokens:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTokens();
  }, [isConnected]);

  if (!isConnected) {
    return null;
  }

  if (loading) {
    return (
      <Box p={6} bg="white" borderRadius="md" boxShadow="sm" width="250px">
        <Flex justify="center" align="center" height="100px">
          <Spinner />
        </Flex>
      </Box>
    );
  }

  return (
    <Box p={6} bg="white" borderRadius="md" boxShadow="sm" width="250px">
      <Text fontWeight="bold" mb={3}>Your Balances</Text>
      <VStack align="stretch" spacing={3}>
        {tokens.map((token) => (
          <BalanceItem key={token.tokenAddress} token={token} />
        ))}
      </VStack>
    </Box>
  );
};

const BalanceItem: React.FC<{ token: Currency }> = ({ token }) => {
  const { data: balance } = useBalance({
    address: useAccount().address,
    token: token.tokenAddress as `0x${string}`,
  });

  const formatBalance = (value: string) => {
    const number = parseFloat(value);
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  };

  return (
    <Flex justify="space-between" align="center">
      <Text fontWeight="medium">{token.tokenSymbol}</Text>
      <Text>{balance ? formatBalance(balance.formatted) : '0.00'}</Text>
    </Flex>
  );
};

export default BalancesWidget;