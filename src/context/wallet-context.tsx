'use client';

import * as React from 'react';

import { type Connector, useAccount, useSignMessage } from 'wagmi';
import { WalletModal, WalletModalContent } from '@/components/wallet/wallet-modal';
import {
  Account,
  AuthSignMessage,
  WalletConnectors
} from '@/components/wallet/wallet-connect';
import { getCookieStorage, setCookieStorage } from '@/lib/cookie-storage';
import { AlertDialog } from '@/components/ui/alert-dialog';

const MODAL_CLOSE_DURATION = 320;

export const WalletContext = React.createContext<{
  pendingConnector: Connector | null;
  setPendingConnector: React.Dispatch<React.SetStateAction<Connector | null>>;
  isConnectorError: boolean;
  setIsConnectorError: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openAuthDialog: boolean;
  setOpenAuthDialog: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  pendingConnector: null,
  setPendingConnector: () => null,
  isConnectorError: false,
  setIsConnectorError: () => false,
  open: false,
  setOpen: () => false,
  openAuthDialog: false,
  setOpenAuthDialog: () => false
});

export default function WalletProvider(props: { children: React.ReactNode }) {
  const { status, address } = useAccount();
  const [pendingConnector, setPendingConnector] = React.useState<Connector | null>(null);
  const [isConnectorError, setIsConnectorError] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openAuthDialog, setOpenAuthDialog] = React.useState(false);
  const [openUserDialog, setOpenUserDialog] = React.useState(false);
  const isConnected = address && !pendingConnector;
  const [nonce, setNonce] = React.useState<string | null>(null);

  // Add the useSignMessage hook
  // const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage();

  // console.log(status);
  // console.log(pendingConnector);

  // async function fetchNonce() {
  //   if (address) {
  //     const nonce: any = await getNonce({ address });
  //     console.log('before', nonce.code);

  //     if (nonce.code === 200) {
  //       console.log('after', nonce);
  //       signMessage({
  //         message: `Signing into SafeLaunch: ${nonce.result}`
  //       }); // Call signMessage here
  //     }
  //   }
  // }

  // fetchNonce();

  React.useEffect(() => {
    if (status === 'connected' && pendingConnector) {
      const checkAuthToken = async () => {
        const token = await getCookieStorage('auth_token');
        if (!token) {
          setOpenAuthDialog(true);
        }
      };
      checkAuthToken();
      setOpen(false);
      setCookieStorage('accountKey', address);
      const timeout = setTimeout(() => {
        setPendingConnector(null);
        setIsConnectorError(false);
      }, MODAL_CLOSE_DURATION);

      return () => clearTimeout(timeout);
    }
  }, [status, setOpen, pendingConnector, setPendingConnector]);

  // React.useEffect(() => {
  //   (async () => {
  //     if (!isConnected) {
  //       return;
  //     }

  //     const token = await getCookieStorage('auth_token');
  //     if (!token) {
  //       setOpenAuthDialog(true);
  //     }
  //   })();
  // }, [isConnected, setOpenAuthDialog]);

  React.useEffect(() => {
    const checkAuthToken = async () => {
      if (isConnected) {
        const token = await getCookieStorage('auth_token');
        if (!token) {
          setOpenAuthDialog(true);
        }
      }
    };
    const timeoutId = setTimeout(checkAuthToken, 100);

    return () => clearTimeout(timeoutId);
  }, [isConnected, setOpenAuthDialog]);

  return (
    <WalletContext.Provider
      value={{
        pendingConnector,
        setPendingConnector,
        isConnectorError,
        setIsConnectorError,
        open,
        setOpen,
        openAuthDialog,
        setOpenAuthDialog
      }}
    >
      {props.children}
      <WalletModal open={open} onOpenChange={setOpen}>
        <WalletModalContent>
          {isConnected ? <Account /> : <WalletConnectors />}
        </WalletModalContent>
      </WalletModal>
      <WalletModal open={openAuthDialog} onOpenChange={setOpenAuthDialog}>
        <WalletModalContent>
          <AuthSignMessage />
        </WalletModalContent>
      </WalletModal>
      {/* <AlertDialog open={openUserDialog} onOpenChange={setOpenUserDialog}>
        <RegisterUserForm />
      </AlertDialog> */}
    </WalletContext.Provider>
  );
}
