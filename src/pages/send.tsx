import React from 'react';
import { Container, Heading, Box, Flex, Text } from '@chakra-ui/react';
import SendComponent from '../components/SendComponent';
import ClientOnly from '../components/ClientOnly';
import dynamic from 'next/dynamic';
import { useAccount } from 'wagmi';

// Import BalancesWidget dynamically with ssr disabled
const BalancesWidget = dynamic(() => import('../components/BalancesWidget'), { ssr: false });

const SendPage = () => {
  const { isConnected } = useAccount();

  return (
    <Container maxW="container.xl" py={10}>
      <Heading as="h1" size="xl" mb={8}>
        Send Money
      </Heading>
      <ClientOnly>
        {isConnected ? (
          <Flex direction={['column', 'column', 'row']} align="flex-start" justify="space-between">
            <Box width={['100%', '100%', '65%']} mb={[8, 8, 0]}>
              <SendComponent />
            </Box>
            <Box width={['100%', '100%', '30%']}>
              <BalancesWidget />
            </Box>
          </Flex>
        ) : (
          <Text fontSize="lg" textAlign="center">
            Please connect your wallet to send money.
          </Text>
        )}
      </ClientOnly>
    </Container>
  );
};

export default SendPage;