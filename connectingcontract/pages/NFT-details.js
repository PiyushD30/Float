import React, {useState, useEffect, useContext } from "react";
import { useRouter } from "next/Router";
//INTERNAL IMPORT
import { Button, Category, Brand } from "../components/componentsindex";
import NFTDetailsPage from "../NFTDetailsPage/NFTDetailsPage";

import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const NFTDetails = () => {

  const {currentAccount} = useContext(NFTMarketplaceContext)
  const [nft, setNFT] = useState({
    image: "",
    tokenId: "",
    name: "",
    price: "",
    seller:""
  });

  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    setNFT(router.query);
  }, [router.isReady]);
  
  
  return (
    <div>
      <NFTDetailsPage nft={nft} />
      <Category />
      <Brand />
    </div>
  );
};

export default NFTDetails;
