import React, { useState, useEffect } from 'react';
import { useWalletContext, WalletStateTypes, WalletActionTypes, Web3Status } from '@/context/WalletWrapper'
import Profile from "@/components/Profile"
import { useRouter } from 'next/router';
import axios from 'axios';

interface CourseCard {
  id: string;
  name: string;
  image: string;
  description: string;
}


export default ()=>{

  const [ state, action ] = useWalletContext();
  const { walletState } = (state as WalletStateTypes );
  const [ nfts, setNfts] = useState<NFT[]>([]);
  const router = useRouter();

  useEffect(()=> {
    // setWalletState((state as WalletStateTypes ).walletState)
    if( walletState != Web3Status.AccountConnected ) {
      router.push("/")
    }
  }, [])

  useEffect(() => {
    // Fetch NFTs (you can replace this with your own API call)
    const fetchNFTs = async () => {
      const response = await axios.get('/api/nfts'); // Example API call
      setNfts(response.data);
    };

    fetchNFTs();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <Profile strokeColor={'slate'} color="gray" />
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">My NFTs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {nfts.map((nft) => (
            <div key={nft.id} className="border rounded-lg overflow-hidden shadow-lg p-4">
              <img src={nft.image} alt={nft.name} className="w-full h-48 object-cover mb-4" />
              <h3 className="text-lg font-bold">{nft.name}</h3>
              <p className="text-gray-600">{nft.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
