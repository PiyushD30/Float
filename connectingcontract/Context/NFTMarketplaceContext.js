import React, {useState, useEffect, useContext} from "react";
import web3Modal from "web3modal";
import { ethers } from 'ethers';
import { useRouter } from 'next/Router';
import axios from 'axios';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { NFTStorage, File } from 'nft.storage';
import mime from 'mime';


const NFT_STORAGE_KEY = 'YOUR_NFT_STORAGE_API_KEY';

const projectId = "your project id";
const projectSecretKey = "project secretKey";
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString("base64")}`;

const client = ipfsHttpClient({
    host: "infura-ipfs.io",
    port: 5001,
    protocol: "https",
    header: {
        authorization: auth,
    },
})

const subdomain = "your subdomain"
//INTERNAL IMPORT
import { NFTMarketplaceAddress, NFTMarketplaceABI } from './constants';

//fetching smart contract
const fetchContract = (signerOrProvider) => new ethers.Contract(NFTMarketplaceAddress, NFTMarketplaceABI, signerOrProvider);


//connectingWithSmartContract

const connectingWithSmartContract = async () => {
    try {
        const web3Modal = new web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        return contract;
    } catch (error) {
        console.log("Something went wrong")
    }
}

export const NFTMarketplaceContext = React.createContext();
export const NFTMarketplaceProvider = ({ children }) => {
    const titleData = "Discover, collect and sell NFTs"

    const [currentAccount, setCurrentAccount] = useState("");
    const router = useRouter();
    //--check if wallet is connected

    useEffect(() => {
        checkIfWalletConnected();
    }, []);

    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum) return console.log("Install MetaMask");

            const accounts = await window.ethereum.request({ method: 'eth_accounts', });

            if (accounts.length) {
                setCurrentAccount(accounts[0])
            } else {
                console.log("No Account");
            }
        } catch (error) {
            console.log("Something went wrong while connecting to wallet");
        }
    };
    //connect wallet
    const connectWallet = async () => {
        try {
            if (!window.ethereum) return console.log("Install MetaMask");

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts', });

            setCurrentAccount(accounts[0])
            //window.location.reload();
        } catch (error) {
            console.log("Error while connecting to wallet");
        }
    };

    //upload to ipfs
    // const uploadToIPFS = async (file) => {
    //     try {
    //         const added = await client.add({ content: file });
    //         const url = '${subdomain}/ipfs/${added.path}';
    //         return url;
    //     } catch (error) {
    //         console.log("Error while uploading to IPFS", (error));
    //     }
    // };

    async function uploadToNFTStorage(imagePath) {
    try {
        // Load the file from disk
        const image = await fileFromPath(imagePath);

        // Create a new NFTStorage client using your API key
        const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });

        // Call client.store, passing in the image
        const { cid } = await nftstorage.store(image);

        // Return the CID as the URL
        return `https://ipfs.io/ipfs/${cid}`;
    } catch (error) {
        console.error('Error while uploading to NFT.Storage', error);
        throw error;
    }
}

    //create nft
    // const createNFT = async (name, price, image, description, router) => {
    
    //     if (!name || !description || !price /*|| !image*/) {
    //         return console.log("Data Missing")
    //     }
    //     const data = JSON.stringify({ name, description, image })
            
    //     try {
    //         const added = await client.add(data);
    //         const url = 'https://infura-ipfs.io/ipfs/${added.path}';
    //         await createSale(url, price);
    //     } catch (error) {
    //         console.log("Error while creating nft");
    //     }
    // };

    const createNFT = async (name, price, imagePath, description, router) => {
    if (!name || !description || !price || !imagePath) {
        return console.log('Data Missing');
    }

    try {
        const imageIpfsUrl = await uploadToNFTStorage(imagePath);
        const data = JSON.stringify({ name, description, image: imageIpfsUrl });

        await createSale(url, price);
    } catch (error) {
        console.log('Error while creating NFT');
    }
};

    //createSale function
    const createSale = async (formInputPrice, url, isReselling, id) => {
        try {
            const price = ethers.utils.parseUnits(formInputPrice, "ether");
            const contract = await connectingWithSmartContract();
            const listingPrice = await contract.getListingPrice();
            const transaction = !isReselling ? await contract.createToken(url, price, {
                value: listingPrice.toString(),
            }) : await contract.reSellToken(url, price, {
                value: listingPrice.toString(),
            });

            await transaction.wait();
            console.log(transaction)
            router.push("/searchPage")
        } catch (error) {
            console.log("Error while selling");
        }
    };

    //fetchNFTs

    const fetchNFTs = async () => {
        try {
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);

            const data = await contract.fetchMarketItem();

            const items = await Promise.all(
                data.map(async({ tokenId, seller, owner, price: unformattedPrice }) => {
                    const tokenURI = await contract.tokenURI(tokenId);

                    const {
                        data: { image, name, description },
                    } = await axios.get(tokenURI);
                    const price = ethers.utils.formatUnits(
                        unformattedPrice.toString(),
                        "ether"
                    );

                    return {
                        price,
                        tokenId: tokenId.toNumber(),
                        seller,
                        owner,
                        image,
                        name,
                        description,
                        tokenURI                    }
                    }
                )
            );

            return items;

        } catch (error) {
            console.log("Error while fetching nfts");
        }
    };


    useEffect(() => {
        fetchNFTs();
    }, []);
    //fetching my nfts or listed nfts

    const fetchMyNFTsOrListedNFTs = async (type) => {
        try {
            const contract = await connectingWithSmartContract();

            const data =
                type == "fetchItemsListed"
                    ? await contract.fetchItemsListed()
                    : await contract.fetchMyNFT();
                 
            const items = await Promise.all(
                data.map(async({ tokenId, seller, owner, price: unformattedPrice }) => {
                    const tokenURI = await contract.tokenURI(tokenId);
                    const {
                        data: { image, name, description },
                    } = await axios.get(tokenURI);
                    const price = ethers.utils.formatUnits(
                        unformattedPrice.toString(),
                        "ether"
                    );
                    return {
                        price,
                        tokenId: tokenId.toNumber(),
                        seller,
                        owner,
                        image,
                        name,
                        description,
                        tokenURI                    }
                    }
                )
            );

            return items;

        } catch (error) {
            console.log("Error while fetching listed nfts");
        }
    };

    //buy nfts
    const buyNFT = async (nft) => {
        try {
            const contract = await connectingWithSmartContract();
            const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
            const transaction = await contract.createMarketSale(nft.tokenId, { value: price },);

            await transaction.wait();
            router.push("/author")
        } catch (error) {
            console.log("Error while buying nft");
        }
    };


    return (
        <NFTMarketplaceContext.Provider value={
            {
                uploadToIPFS,
                checkIfWalletConnected,
                connectWallet,
                createNFT,
                fetchNFTs,
                fetchMyNFTsOrListedNFTs,
                buyNFT,
                currentAccount,
                titleData
            }}>
            {children}
        </NFTMarketplaceContext.Provider>
    )
}
async function main() {
    const args = process.argv.slice(2);
    if (args.length !== 3) {
        console.error(`Usage: ${process.argv[0]} ${process.argv[1]} <image-path> <name> <description>`);
        process.exit(1);
    }

    const [imagePath, name, description] = args;
    await createNFT(name, description, imagePath);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});