import React from 'react';
import { Container, Heading, Box, Flex } from '@chakra-ui/react';
import SendComponent from '../components/SendComponent';
import ClientOnly from '../components/ClientOnly';
import dynamic from 'next/dynamic';

// Import BalancesWidget dynamically with ssr disabled
const BalancesWidget = dynamic(() => import('../components/BalancesWidget'), { ssr: false });

const SendPage = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <Heading as="h1" size="xl" mb={8}>
        Send Funds
      </Heading>
      <Flex direction={['column', 'column', 'row']} align="flex-start" justify="space-between">
        <Box width={['100%', '100%', '65%']} mb={[8, 8, 0]}>
          <ClientOnly>
            <SendComponent />
          </ClientOnly>
        </Box>
        <Box width={['100%', '100%', '30%']}>
          <ClientOnly>
            <BalancesWidget />
          </ClientOnly>
        </Box>
      </Flex>
    </Container>
  );
};

export default SendPage;