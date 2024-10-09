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
} from '@chakra-ui/react'
import { StakeUtils, Currency } from '../utils/StakeUtils'
import { ethers } from 'ethers'
// import SeederButton from './SeederButton'
import AddTokenButton from './AddTokenButton'
import { AddIcon } from '@chakra-ui/icons'
import { useAccount } from 'wagmi'

const LiquidityPoolsList: React.FC = () => {
  const [liquidityPools, setLiquidityPools] = useState<Currency[]>([])
  const [loading, setLoading] = useState(true)
  const { isConnected } = useAccount()

  useEffect(() => {
    const fetchLiquidityPools = async () => {
      try {
        const stakeUtils = new StakeUtils()
        const pools = await stakeUtils.getSupportedTokens()
        // console.log("Received pools data:", JSON.stringify(pools, null, 2));
        setLiquidityPools(pools)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching liquidity pools:', error)
        setLoading(false)
      }
    }

    fetchLiquidityPools()
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
        {/* <SeederButton /> */}
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Token Name</Th>
            <Th><AddIcon boxSize={3} /></Th>
            <Th>ISO Code</Th>
            <Th>Your Liquidity</Th>
            <Th>TVL</Th>
            <Th>Transaction Fee</Th>
            <Th>Fee Tier</Th>
            <Th>Rewards Pool</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {liquidityPools.map((pool) => {
            console.log("Rendering pool:", pool);
            return (
              <Tr key={pool.tokenSymbol}>
                <Td>
                  <Text fontWeight="bold">{pool.tokenSymbol}</Text>
                </Td>
                <Td>
                  <AddTokenButton tokenSymbol={pool.tokenSymbol} tokenAddress={pool.tokenAddress} />
                </Td>
                <Td>{pool.isoCode}</Td>
                <Td>{isConnected ? '0.00' : '-'}</Td>
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
            );
          })}
        </Tbody>
      </Table>
    </Box>
  )
}

export default LiquidityPoolsList