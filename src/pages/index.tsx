import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Container, Heading, Text } from '@chakra-ui/react';
import ExchangeComponent from '../components/ExchangeComponent';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Currency Exchange App</title>
        <meta name="description" content="Currency exchange application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW="container.xl" py={8}>
        <Box textAlign="center" mb={8}>
          <Heading as="h1" size="2xl" mb={2}>
            Currency Exchange
          </Heading>
          <Text fontSize="xl" color="gray.600">
            Convert between USD and EGP easily
          </Text>
        </Box>

        <ExchangeComponent />
      </Container>
    </>
  );
};

export default Home;
