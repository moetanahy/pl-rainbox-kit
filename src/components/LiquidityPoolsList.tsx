import React, { useState, useEffect } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Box,
  Text,
  Flex,
  Spinner,
  Heading,
} from '@chakra-ui/react'
import { StakeUtils, Currency } from '../utils/StakeUtils'
import { ethers } from 'ethers'
import SeederButton from './SeederButton'

const LiquidityPoolsList: React.FC = () => {
  const [liquidityPools, setLiquidityPools] = useState<Currency[]>([])
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const [connectedAddress, setConnectedAddress] = useState<string | null>(null)

  useEffect(() => {
    const fetchLiquidityPools = async () => {
      try {
        const stakeUtils = new StakeUtils()
        const pools = await stakeUtils.getSupportedTokens()
        setLiquidityPools(pools)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching liquidity pools:', error)
        setLoading(false)
      }
    }

    fetchLiquidityPools()

    // Simulating wallet connection (replace with actual wallet connection logic)
    const simulateWalletConnection = async () => {
      // Replace this with actual wallet connection logic
      const address = '0x28E1CbD9d3a90Dc11492a93ceb87F5bE3DD4FE6a' // PL_DAZU_Treasury address for testing
    //   setConnectedAddress(address)
      setIsLoggedIn(true)
    }

    simulateWalletConnection()
  }, [])

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="200px">
        <Spinner size="xl" />
      </Flex>
    )
  }

  return (
    <Box overflowX="auto" width="100%">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        {/* <SeederButton connectedAddress={connectedAddress} /> */}
        {/* <Heading as="h2" size="lg">Stake and earn rewards</Heading> */}
        
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Token Name</Th>
            <Th>ISO Code</Th>
            <Th>Your Liquidity</Th>
            <Th>TVL (Total Value Locked)</Th>
            <Th>Transaction Fee</Th>
            <Th>Fee Tier</Th>
            <Th>Rewards Pool</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {liquidityPools.map((pool) => (
            <Tr key={pool.tokenSymbol}>
              <Td>
                <Text fontWeight="bold">{pool.tokenSymbol}</Text>
              </Td>
              <Td>{pool.isoCode}</Td>
              <Td>{isLoggedIn ? '0.00' : '-'}</Td>
              <Td>{ethers.formatEther(pool.totalStaked)} {pool.tokenSymbol}</Td>
              <Td>{pool.transactionFee}%</Td>
              <Td>{pool.feeTier}</Td>
              <Td>{ethers.formatEther(pool.rewardsPool)} {pool.tokenSymbol}</Td>
              <Td>
                <Flex justifyContent="flex-end">
                  <Button
                    backgroundColor="#15263e"
                    color="white"
                    size="sm"
                    _hover={{ backgroundColor: "#1e3a5f" }}
                  >
                    Add Liquidity
                  </Button>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default LiquidityPoolsList