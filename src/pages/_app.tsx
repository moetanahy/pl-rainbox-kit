import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, getDefaultConfig, Chain } from '@rainbow-me/rainbowkit';

// Import ChakraProvider and other necessary Chakra UI components
import { ChakraProvider, CSSReset, extendTheme } from '@chakra-ui/react'

import Header from '../components/Header.tsx'

const xrpl_evm_sidechain_devnet = {
  id: 1440002,
  name: 'XRPL EVM Sidechain Devnet',
  iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/52.png',
  iconBackground: '#fff',
  nativeCurrency: { name: 'XRP', symbol: 'XRP', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc-evm-sidechain.xrpl.org'] },
  },
  blockExplorers: {
    default: { name: 'xrpl-evm-explorer-devnet', url: 'https://evm-sidechain.xrpl.org' },
  }
} as const satisfies Chain;

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [xrpl_evm_sidechain_devnet],
});

const queryClient = new QueryClient();

// Optionally, you can create a custom theme
const theme = extendTheme({
  // Add your custom theme configurations here
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <Header />
            <Component {...pageProps} />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ChakraProvider>
  );
}

export default MyApp;
