'use client'
import Head from 'next/head'

import React, { useState, useEffect } from 'react';
import MyComponent from '../components/MyComponent'
import WalletOptions from '@/components/WalletOptions'
import '@/types.d'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/router';

import { useWalletContext, WalletStateTypes, WalletActionTypes, Web3Status } from '@/context/WalletWrapper'


export default () =>{

  const [ address, setAddress ] = useState<string>('')
  const [ state, action ] = useWalletContext();
  const { walletState } = (state as WalletStateTypes );
  const router = useRouter();


  useEffect(()=>{
    // setWalletState((state as WalletStateTypes ).walletState)
    if( walletState == Web3Status.AccountConnected ) {
      router.push("/dashboard")
    } else {
      setAddress( "" )
    }
  })


  /* when the page is loaded, first check ethereum wallet is available */
  return <>
      <Head>
        <title>Mec Issuer Registry</title>
      </Head>
      <MyComponent active={ walletState === Web3Status.NoWallet} title={"Install Wallet"} />
      <MyComponent active={ walletState === Web3Status.WalletExists} title={"Wallet Available"} />
      <MyComponent active={ walletState === Web3Status.AccountConnected} title={`Account: ${address}`} />
      { ( walletState === Web3Status.NoWallet ) && <WalletOptions/> }
      { ( walletState === Web3Status.WalletExists ) &&  <button
            onClick={(action as WalletActionTypes).connect}
          >
            connect account
          </button> }
    </>
 
};

