import React, { useState, useEffect } from "react";
import {
  useWalletContext,
  WalletStateTypes,
  WalletActionTypes,
  Web3Status,
} from "@/context/WalletWrapper";
import Profile from "@/components/Profile";
import { useRouter } from "next/router";
import Courses from "@/components/Courses";
import Link from "next/link";

export default () => {
  const [state, action] = useWalletContext();
  const { walletState } = state as WalletStateTypes;
  const router = useRouter();

  useEffect(() => {
    // setWalletState((state as WalletStateTypes ).walletState)
    if (walletState != Web3Status.AccountConnected) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <Profile strokeColor={"slate"} color="gray" />
      </div>
      {walletState === Web3Status.AccountConnected && (
            <Courses />
      )}
    </>
  );
};
