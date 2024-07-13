import React, { useEffect } from "react";
import {
  useWalletContext,
  WalletStateTypes,
  Web3Status,
} from "@/context/WalletWrapper";
import Profile from "@/components/Profile";
import { useRouter } from "next/router";
import Courses from "@/components/Courses";

export default () => {
  const [state] = useWalletContext();
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
        <Profile />
      </div>
      {walletState === Web3Status.AccountConnected && (
            <Courses />
      )}
    </>
  );
};
