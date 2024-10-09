import { Box, Container, Heading, Text, VStack, Flex, Spacer } from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import Header from '../components/Header'
import LiquidityPoolsList from '../components/LiquidityPoolsList'
import dynamic from 'next/dynamic'
import { isAllowedToSeed } from '../utils/WalletUtils'
import ClientOnly from '../components/ClientOnly'

// Import components dynamically with ssr disabled
const SeederButton = dynamic(() => import('../components/SeederButton'), { ssr: false })
const BalancesWidget = dynamic(() => import('../components/BalancesWidget'), { ssr: false })

export default function StakePage() {
  const { address, isConnected } = useAccount()

  return (
    <Box minHeight="calc(100vh - 80px)">
      <Container maxW="container.xl" px={[4, 6, 8]}>
        <VStack align="stretch" spacing={6} py={8}>
          <Flex alignItems="flex-start">
            <Box flex="1" mr={8} maxWidth="70%">
              <Heading fontSize={["2xl", "3xl", "4xl"]} fontWeight="bold" lineHeight="shorter" whiteSpace="nowrap">
                Stake stablecoins and earn interest
              </Heading>
              <Text fontSize={["md", "lg"]} color="gray.700" mt={2}>
                Provide liquidity to our pools and earn attractive APRs
              </Text>
            </Box>
            <ClientOnly>
              <Box flexShrink={0}>
                <BalancesWidget />
                {isConnected && address && isAllowedToSeed(address) && (
                  <Box mt={4}>
                    <SeederButton />
                  </Box>
                )}
              </Box>
            </ClientOnly>
          </Flex>
          <LiquidityPoolsList />
        </VStack>
      </Container>
    </Box>
  )
}