import { Box, Flex, Spacer, Image, Container } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Header() {
  return (
    <Box 
      as="header" 
      bg="white" 
      borderBottom="1px solid" 
      borderColor="gray.400"
      boxShadow="sm"
    >
      <Container maxW="container.xl">
        <Flex 
          align="center" 
          justify="space-between" 
          wrap="wrap" 
          py="1.5rem"
        >
          <Flex align="center" mr={5}>
            <Image src="/dazu-logo.png" alt="DAZU Logo" width="150px" height="auto" />
          </Flex>
          <Spacer />
          <Box>
            <ConnectButton />
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}