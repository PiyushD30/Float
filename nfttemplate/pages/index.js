import React from 'react'

//internal import

import Style from '../styles/index.module.css';
import { HeroSection, Service, BigNFTSlider, Subscribe, Title, Category, Filter, NFTCard, Collection,AudioLive, FollowerTab} from '../components/componentsindex'
const Home = () => {
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
            <FollowerTab/>
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
        </div>
    )
}
export default Home