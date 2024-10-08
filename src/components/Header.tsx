import { Box, Flex, Spacer } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Header() {
  return (
    <Box bg="gray.100" py={4}>
      <Flex maxW="container.xl" mx="auto" px={4} alignItems="center">
        <Box fontWeight="bold" fontSize="xl">My App</Box>
        <Spacer />
        <ConnectButton />
      </Flex>
    </Box>
  )
}