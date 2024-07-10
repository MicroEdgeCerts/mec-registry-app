// components/Header.js
import { useEffect, useState } from "react";
import {
  useWalletContext,
  WalletStateTypes,
  WalletActionTypes,
  Web3Status,
} from "@/context/WalletWrapper";
import AccountIcon from "@/components/icons/AccountIcon";
const Header = () => {
  const [state, action] = useWalletContext();
  const { walletState, address } = state as WalletStateTypes;
  const [trimmedAddress, setTrimmedAddress] = useState<string>("");
  const minAddress = 4;
  useEffect(() => {
    if (address !== null && address.length > minAddress) {
      setTrimmedAddress(`${address.substring(0, minAddress)}...`);
    } else {
      setTrimmedAddress("");
    }
  }, [address]);
  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl">MEC Registry</div>
        <nav className="space-x-4">
          {walletState === Web3Status.WalletExists && (
            <button
              onClick={( action as   WalletActionTypes ).connect}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Connect Wallet
            </button>
          )}
          {walletState === Web3Status.AccountConnected && (
            <div className="flex items-center space-x-2">
              <span className="text-white">Account: {trimmedAddress}</span>
              <AccountIcon />
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
