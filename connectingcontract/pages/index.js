import React, {useState, useEffect, useContext} from 'react'

//internal import

import Style from '../styles/index.module.css';
import { HeroSection, Service, BigNFTSlider, Subscribe, Title, Category, Filter, NFTCard, Collection, AudioLive, FollowerTab, Slider, Video } from '../components/componentsindex'

import { NFTMarketplaceContext } from '../Context/NFTMarketplaceContext';
const Home = () => {

    const {checkIfWalletConnected } = useContext(NFTMarketplaceContext);
    useEffect(() => {
        checkIfWalletConnected();
    }, []);
    return (
        <div className={Style.homePage}>
            <HeroSection />
            <Service />
            <BigNFTSlider />
            <Title
                heading="Latest Audio NFTs"
                paragraph="World-Class Audio NFTs at your fingertips"
            /> 
            <AudioLive/>
            <FollowerTab />
            <Slider/>
            <Collection />
            <Title
                heading="Featured NFTs"
                paragraph="Discover the hot selling NFTs"
            />
            <Filter />
            <NFTCard />
            <Title
                heading="Browse by Category"
                paragraph="Explore the most featured NFTs. You are just a click away."
            />
            <Category/>
            <Subscribe />
            <Video/>
        </div>
    )
}
export default Home