import React from 'react';
import { Container, Heading, VStack } from '@chakra-ui/react';
import SendComponent from '../components/SendComponent';
import ClientOnly from '../components/ClientOnly';

const SendPage = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          Send Funds
        </Heading>
        <ClientOnly>
          <SendComponent />
        </ClientOnly>
      </VStack>
    </Container>
  );
};

export default SendPage;