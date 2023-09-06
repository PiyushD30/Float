// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

//internal import for nft openzeppelin
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract NFTMarketplace is ERC721URIStorage{
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    uint listingPrice = 0.0025 ether;
    address payable owner;

    mapping(uint256 => MarketItem) private idMarketItem;

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint price;
        bool sold;
    }

    event idMarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint price,
        bool sold
    );

    modifier onlyOwner{
        require(msg.sender == owner,"Only owner of the marketplace can change the listing price");
        _;
    }

    constructor() ERC721("Float", "FLT"){
        owner == payable(msg.sender);
    }

    function updateListingPrice(uint256 _listingPrice) public payable onlyOwner{
         listingPrice = _listingPrice;

    }

    function getListingPrice() public view returns(uint256){
        return listingPrice;
    }

    //CREATE NFT TOKEN FUNCTION(mint an nft)

    function createToken(string memory tokenURI, uint256 price) public payable returns (uint256){
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        createMarketItem(newTokenId, price);

        return newTokenId;
    }
    
    //creating market items(listing an nft)

    function createMarketItem(uint256 tokenId, uint256 price) private{
        require(price>0,"Price must be greater than zero");
        require(msg.value==listingPrice,"Price must be equal to listing Price");

        idMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)), 
            price,
            false
        );

        _transfer(msg.sender, address(this), tokenId);

        emit idMarketItemCreated(tokenId,msg.sender,address(this),price,false);
    }

    //function for resale token(to sell an nft)

    function reSellToken(uint256 tokenId, uint256 price) public payable{
        require(idMarketItem[tokenId].owner == msg.sender,"You do not own the nft");
        require(msg.value == listingPrice,"Price must be equal to listing Price");

        idMarketItem[tokenId].sold = false;
        idMarketItem[tokenId].price = price;
        idMarketItem[tokenId].seller = payable(msg.sender);
        idMarketItem[tokenId].owner = payable(address(this));

        _itemsSold.decrement();

        _transfer(msg.sender, address(this), tokenId);
    }

    //function createmarketsale(purchasing an nft)

    function createMarketSale(uint256 tokenId) public payable {
        uint256 price = idMarketItem[tokenId].price;

        require(msg.value == price, "Please submit the asking price in order to complete the purchase");

        idMarketItem[tokenId].owner = payable(msg.sender);
        idMarketItem[tokenId].sold = true;
        idMarketItem[tokenId].owner = payable(address(0));

        _itemsSold.increment();

        _transfer(address(this), msg.sender, tokenId);

        payable(owner).transfer(listingPrice);
        payable(idMarketItem[tokenId].seller).transfer(msg.value);
    }

    //getting unsold nft data(getting all nfts present in marketplace)

    function fetchMarketItem() public view returns(MarketItem[] memory){
        uint256 itemCount = _tokenIds.current();
        uint256 unSoldItemCount = _tokenIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unSoldItemCount);
        for(uint256 i=0; i< itemCount; i++){
            if(idMarketItem[i+1].owner == address(this)){
                uint256 currentId = i+1;
                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    //purchased item(items bought by the user)

    function fetchMyNFT() public view returns(MarketItem[] memory){
        uint256 totalCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for(uint256 i=0; i< totalCount; i++){
            if(idMarketItem[i+1].owner == msg.sender){
                itemCount+=1;
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);
        for(uint256 i=0; i<totalCount; i++){
            if(idMarketItem[i+1].owner == msg.sender){
               uint256 currentId = i+1;
               MarketItem storage currentItem = idMarketItem[currentId];
               items[currentIndex] = currentItem;
               currentIndex+=1;
            }   
        }
        return items;
    }

    //single user items(items listed by user)

    function fetchItemsListed () public view returns(MarketItem[] memory){
        uint256 totalCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for(uint256 i=0; i< totalCount; i++){
            if(idMarketItem[i+1].seller == msg.sender){
                itemCount+=1;
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);
        for(uint256 i=0; i<totalCount; i++){
            if(idMarketItem[i+1].seller == msg.sender){
               uint256 currentId = i+1;
               MarketItem storage currentItem = idMarketItem[currentId];
               items[currentIndex] = currentItem;
               currentIndex+=1;
            }   
        }
        return items;
    }  
}