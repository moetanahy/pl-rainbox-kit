import { Box, Flex, Text, VStack, Container } from '@chakra-ui/react'
import ExchangeComponent from './ExchangeComponent'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TypingAnimation: React.FC<{ text: string; color: string }> = ({ text, color }) => {
  const [displayText, setDisplayText] = useState('')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[index])
        setIndex(index + 1)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [index, text])

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ color }}
    >
      {displayText}
    </motion.span>
  )
}

export default function HomePage() {
  const [isUSToEgypt, setIsUSToEgypt] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsUSToEgypt(prev => !prev)
    }, 6000) // Switch every 6 seconds (3s for typing + 3s for display)
    return () => clearInterval(interval)
  }, [])

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
              The cheapest and fastest way to send money from{' '}
              <AnimatePresence mode="wait">
                {isUSToEgypt ? (
                  <TypingAnimation key="usToEgypt" text="the US to Egypt" color="#5059a3" />
                ) : (
                  <TypingAnimation key="egyptToUS" text="Egypt to the US" color="#5059a3" />
                )}
              </AnimatePresence>
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