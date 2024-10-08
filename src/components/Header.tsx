import { Box, Flex, Spacer, Image } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Header() {
  return (
    <Flex 
      as="header" 
      align="center" 
      justify="space-between" 
      wrap="wrap" 
      padding="1.5rem" 
      bg="white" 
      borderBottom="1px solid" 
      borderColor="gray.400" // Adjust this color to match the DAZU logo color
      boxShadow="sm"
    >
      <Flex align="center" mr={5}>
        <Image src="/dazu-logo.png" alt="DAZU Logo" width="150px" height="auto" />
      </Flex>
      <Spacer />
      <Box>
        <ConnectButton />
      </Box>
    </Flex>
  )
}