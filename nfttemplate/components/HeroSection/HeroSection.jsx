import React from 'react'
import Image from 'next/image'

//internal import

import Style from './HeroSection.module.css';
import { Button } from '../componentsindex';
import images from '../../img';


const HeroSection = () => {
    return (<div className={Style.heroSection}>
        <div className={Style.heroSection_box}>
            <div className={Style.heroSection_box_left}>
                <h1>Get ready to disrupt the world with FLOAT</h1>  
                <p>
                    Wanna sell NFT?
                    Welcome to Float
                    Where your art has Value
                </p>
                <Button btnName='Start your Search'/>
            </div> 
            <div className={Style.heroSection_box_right}>
                <Image src={images.hero} alt="Hero Section" width={600} height={600} />
            </div>
        </div>
    </div>)
}

export default HeroSection