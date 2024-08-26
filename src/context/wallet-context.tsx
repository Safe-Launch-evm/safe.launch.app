'use client';

import * as React from 'react';

import { type Connector, useAccount } from 'wagmi';
import { WalletModal, WalletModalContent } from '@/components/wallet/wallet-modal';
import { Account, WalletConnectors } from '@/components/wallet/wallet-connect';

const MODAL_CLOSE_DURATION = 320;

export const WalletContext = React.createContext<{
  pendingConnector: Connector | null;
  setPendingConnector: React.Dispatch<React.SetStateAction<Connector | null>>;
  isConnectorError: boolean;
  setIsConnectorError: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  pendingConnector: null,
  setPendingConnector: () => null,
  isConnectorError: false,
  setIsConnectorError: () => false,
  open: false,
  setOpen: () => false
});

export default function WalletProvider(props: { children: React.ReactNode }) {
  const { status, address } = useAccount();
  const [pendingConnector, setPendingConnector] = React.useState<Connector | null>(null);
  const [isConnectorError, setIsConnectorError] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const isConnected = address && !pendingConnector;

  React.useEffect(() => {
    if (status === 'connected' && pendingConnector) {
      setOpen(false);

      const timeout = setTimeout(() => {
        setPendingConnector(null);
        setIsConnectorError(false);
      }, MODAL_CLOSE_DURATION);

      return () => clearTimeout(timeout);
    }
  }, [status, setOpen, pendingConnector, setPendingConnector]);

  return (
    <WalletContext.Provider
      value={{
        pendingConnector,
        setPendingConnector,
        isConnectorError,
        setIsConnectorError,
        open,
        setOpen
      }}
    >
      {props.children}
      <WalletModal open={open} onOpenChange={setOpen}>
        <WalletModalContent>
          {isConnected ? <Account /> : <WalletConnectors />}
        </WalletModalContent>
      </WalletModal>
    </WalletContext.Provider>
  );
}
