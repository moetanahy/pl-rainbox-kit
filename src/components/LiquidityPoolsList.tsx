import React from 'react'
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
} from '@chakra-ui/react'

interface LiquidityPool {
  tokenName: string
  isoCode: string
  myLiquidity: string
  tvl: string
  totalApr: string
}

const liquidityPools: LiquidityPool[] = [
  {
    tokenName: 'USDz',
    isoCode: 'USD',
    myLiquidity: '0',
    tvl: '$1,000,000',
    totalApr: '5.2%',
  },
  {
    tokenName: 'EGPz',
    isoCode: 'EGP',
    myLiquidity: '0',
    tvl: '$500,000',
    totalApr: '7.5%',
  },
]

const LiquidityPoolsList: React.FC = () => {
  return (
    <Box overflowX="auto" width="100%">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Token Name</Th>
            <Th>ISO Code</Th>
            <Th>My Liquidity</Th>
            <Th>TVL</Th>
            <Th>Total APR</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {liquidityPools.map((pool) => (
            <Tr key={pool.tokenName}>
              <Td>
                <Text fontWeight="bold">{pool.tokenName}</Text>
              </Td>
              <Td>{pool.isoCode}</Td>
              <Td>{pool.myLiquidity}</Td>
              <Td>{pool.tvl}</Td>
              <Td>{pool.totalApr}</Td>
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