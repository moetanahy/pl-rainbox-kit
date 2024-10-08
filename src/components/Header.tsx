import { Box, Flex, Spacer, Image, Container } from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useRouter } from 'next/router';

export default function Header() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

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
            <Box as="a" cursor="pointer" onClick={() => handleNavigation('/')}>
              <Image src="/dazu-logo.png" alt="DAZU Logo" width="150px" height="auto" />
            </Box>
          </Flex>
          <Flex align="center" mr={10} ml={40} gap={20}>
              <Box 
                as="span" 
                cursor="pointer"
                color={router.pathname === '/send' ? 'purple.500' : 'inherit'}
                onClick={() => handleNavigation('/send')}
                fontSize="1.1rem"
              >
                Send
              </Box>
              <Box 
                as="span" 
                cursor="pointer"
                color={router.pathname === '/stake' ? 'purple.500' : 'inherit'}
                onClick={() => handleNavigation('/stake')}
                fontSize="1.1rem"
              >
                Stake
              </Box>
          </Flex>
          <Spacer />
          <Box>
            <ConnectButton.Custom>
              {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
                const ready = mounted
                const connected = ready && account && chain

                return (
                  <Box
                    {...(!ready && {
                      'aria-hidden': true,
                      'style': {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <button onClick={openConnectModal} type="button" style={{
                            backgroundColor: '#15263e',
                            color: 'white',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            border: 'none',
                            cursor: 'pointer'
                          }}>
                            Connect Wallet
                          </button>
                        )
                      }

                      if (chain.unsupported) {
                        return (
                          <button onClick={openChainModal} type="button">
                            Wrong network
                          </button>
                        )
                      }

                      return (
                        <div style={{ display: 'flex', gap: 12 }}>
                          <button
                            onClick={openChainModal}
                            style={{ display: 'flex', alignItems: 'center' }}
                            type="button"
                          >
                            {chain.hasIcon && (
                              <div
                                style={{
                                  background: chain.iconBackground,
                                  width: 12,
                                  height: 12,
                                  borderRadius: 999,
                                  overflow: 'hidden',
                                  marginRight: 4,
                                }}
                              >
                                {chain.iconUrl && (
                                  <img
                                    alt={chain.name ?? 'Chain icon'}
                                    src={chain.iconUrl}
                                    style={{ width: 12, height: 12 }}
                                  />
                                )}
                              </div>
                            )}
                            {chain.name}
                          </button>

                          <button onClick={openAccountModal} type="button">
                            {account.displayName}
                            {account.displayBalance
                              ? ` (${account.displayBalance})`
                              : ''}
                          </button>
                        </div>
                      )
                    })()}
                  </Box>
                )
              }}
            </ConnectButton.Custom>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}