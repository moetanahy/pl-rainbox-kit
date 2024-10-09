import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react'
import Header from '../components/Header'
import LiquidityPoolsList from '../components/LiquidityPoolsList'
import SeederButton from '../components/SeederButton'; // Changed to default import

export default function StakePage() {
  return (
    <Box minHeight="calc(100vh - 80px)">
      <Container maxW="container.xl" px={[4, 6, 8]}>
        <VStack align="start" spacing={6} py={8}>
          <Heading fontSize={["2xl", "3xl", "4xl"]} fontWeight="bold" lineHeight="shorter">
            Stake and Earn Rewards
          </Heading>
          {/* <SeederButton connectedAddress={connectedAddress} /> */}

          <Text fontSize={["md", "lg"]} color="gray.700">
            Provide liquidity to our pools and earn attractive APRs
          </Text>
          <LiquidityPoolsList />
        </VStack>
      </Container>
    </Box>
  )
}