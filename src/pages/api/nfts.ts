// pages/api/nfts.ts
import type { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const nfts = [
    {
      id: "1",
      name: "NFT 1",
      image: "https://via.placeholder.com/150",
      description: "This is the first NFT",
    },
    {
      id: "2",
      name: "NFT 2",
      image: "https://via.placeholder.com/150",
      description: "This is the second NFT",
    },
    {
      id: "3",
      name: "NFT 3",
      image: "https://via.placeholder.com/150",
      description: "This is the third NFT",
    },
    {
      id: "4",
      name: "NFT 4",
      image: "https://via.placeholder.com/150",
      description: "This is the fourth NFT",
    },
  ];

  res.status(200).json(nfts);
};

export default handler;
