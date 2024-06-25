import React, { useEffect, useState, createContext, useContext } from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProfileContextProvider from "./ProfileContext";
import { type Address } from "viem";

import config from "@/config";

/* 
  Wraps state and actions for 
  children 
*/
export enum Web3Status {
  WalletExists = "Wallet exists",
  AccountConnected = "Account connected",
  NoWallet = "No wallet",
}

/* --- wagmi library context ------------------------*/
const queryClient = new QueryClient();

interface WalletWrapperPropsType {
  config: any; // Add type for config if necessary
  children: React.ReactNode;
}

const WalletWrapper: React.FC<WalletWrapperPropsType> = ({
  config,
  children,
}) => {
  // Create a query client

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};

/* --- wrapper that uses wagmi ------------------------*/

export type WalletStateTypes = {
  walletState: Web3Status;
  address: Address | null;
};

export type WalletActionTypes = {
  connect: () => void;
};

/* Defining default actions */
const defaultWalletActions: WalletActionTypes = {
  connect: async () => {},
};

/* Defining default state */
const defaultWalletState: WalletStateTypes = {
  walletState: Web3Status.NoWallet,
  address: null,
};

const WalletContext = createContext([defaultWalletState, defaultWalletActions]);

type WalletContextProviderPropType = {
  children: React.ReactNode;
};

const WalletContextProvider = ({ children }: WalletContextProviderPropType) => {
  const [currentState, setState] =
    useState<WalletStateTypes>(defaultWalletState);

  const action = {
    ...defaultWalletActions,
    connect: () => {
      if (window.ethereum) {
        window.ethereum.request({ method: "eth_requestAccounts" });
      }
    },
  };

  /* get account list */
  const updateAccounts = (accounts: string[]) => {
    if (accounts.length > 0) {
      // Account connected
      setState({
        ...currentState,
        walletState: Web3Status.AccountConnected,
        address: accounts[0] as Address,
      });
      console.log("Account connected:", accounts[0]);
    } else {
      // No accounts available or disconnected
      setState({
        ...currentState,
        walletState: Web3Status.WalletExists,
        address: null,
      });
      console.log("Wallet available");
    }
  };

  /* this function listen to account status change event */
  const bindAccountConnectionListener = () => {
    // Subscribe to the 'accountsChanged' event
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", updateAccounts);
    }
  };

  /* this function remove listener from account status change event */
  const removeAccountConnectionListener = () => {
    if (window.ethereum) {
      window.ethereum.removeListener("accountsChanged", updateAccounts);
    }
  };

  /* checking if wallet is installed 
    I couldn't find wagmi support for this. 
  */
  useEffect(() => {
    /**
     * Check if wallet is available or not.
     */
    if (typeof window != "undefined") {
      if (window.ethereum) {
        /**
         * if available, start listening account connection
         * Check if wallet is available or not.
         */
        console.info("wallet installed.");
        setState({
          ...currentState,
          walletState: Web3Status.WalletExists,
        });
        window.ethereum
          .request({ method: "eth_accounts" })
          .then((accounts: string[]) => {
            updateAccounts(accounts);
          });

        /* listen to wallet account changes */
        bindAccountConnectionListener();
        return removeAccountConnectionListener;
      } else {
        setState({
          ...currentState,
          walletState: Web3Status.NoWallet,
        });
      }
    }
  }, []);

  const values = [currentState, action];
  return (
    <WalletContext.Provider value={values}>
      <WalletWrapper config={config.getWagmiConfig()}>
        <ProfileContextProvider>{children}</ProfileContextProvider>
      </WalletWrapper>
    </WalletContext.Provider>
  );
};

export const useWalletContext = () => useContext(WalletContext);

export default WalletContextProvider;
