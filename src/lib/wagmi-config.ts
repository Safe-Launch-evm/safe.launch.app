import { http, createConfig, cookieStorage, createStorage } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { injected, coinbaseWallet, walletConnect } from 'wagmi/connectors';

// Make sure to replace the projectId with your own WalletConnect Project ID,
// if you wish to use WalletConnect (recommended)!
const projectId = '123...abc';

export function getConfig() {
  return createConfig({
    chains: [mainnet],
    connectors: [
      injected({ target: 'metaMask' }),
      coinbaseWallet()
      // walletConnect({ projectId })
    ],
    ssr: true,
    storage: createStorage({
      storage: cookieStorage
    }),
    transports: {
      [mainnet.id]: http()
    }
  });
}

export const config = getConfig();
