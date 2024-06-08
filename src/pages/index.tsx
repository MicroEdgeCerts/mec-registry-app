'use client'
import Head from 'next/head'

import React, { useState, useEffect } from 'react';
import MyComponent from '../components/MyComponent'
import WalletOptions from '@/components/WalletOptions'
import Loading from '@/components/Loading'
import '@/types.d'
import { useAccount } from 'wagmi'

import { useWalletContext, WalletStateTypes, WalletActionTypes, Web3Status } from '@/context/WalletWrapper'


export default () =>{

  const [ address, setAddress ] = useState<string>('')
  const [ isClient, setIsClient ] = useState<boolean>(false)
  const [ state, action ] = useWalletContext();
  const account = useAccount()
  const { walletState } = (state as WalletStateTypes );


  useEffect(()=>{
    // setWalletState((state as WalletStateTypes ).walletState)
    if( walletState == Web3Status.AccountConnected ) {
      setAddress( account.address  as string )
    } else {
      setAddress( "" )
    }
  })

  useEffect(()=>{
    setIsClient(typeof window !== 'undefined')
  }, [])
  if( ! isClient ) return <Loading />
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

