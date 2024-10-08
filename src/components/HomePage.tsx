import { Box, Flex, Text, VStack, Container } from '@chakra-ui/react'
import ExchangeComponent from './ExchangeComponent'

export default function HomePage() {
  return (
    <Box minHeight="calc(100vh - 80px)">
      <Container maxW="container.xl" px={[4, 6, 8]}>
        <Flex 
          direction={['column', 'column', 'row']} 
          align="center" 
          justify="space-between" 
          py={8} 
          minHeight="inherit"
        >
          <VStack 
            align="start" 
            spacing={4} 
            flex={1} 
            mb={[8, 8, 0]}
            pr={[0, 0, 8]}
          >
            <Text fontSize={["2xl", "3xl", "4xl"]} fontWeight="bold" lineHeight="shorter">
              The cheapest and fastest way to send money from the US to Egypt
            </Text>
            <Text fontSize={["md", "lg"]} color="gray.700">
              Experience seamless, low-cost transfers with DAZU
            </Text>
          </VStack>
          
          <Box flex={1} w={['100%', '100%', '50%']} maxW="500px">
            <ExchangeComponent />
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}