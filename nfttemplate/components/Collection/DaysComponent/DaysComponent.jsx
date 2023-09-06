import React from 'react'
import Image from 'next/image'
import { MdVerified } from "react-icons/md"
//internal import

import Style from './DaysComponent.module.css';
import images from '../../../img'

const DaysComponent = () => {
    return (
        <div className={Style.daysComponent}>
            <div className={Style.daysComponent_box}>
                <div className={Style.daysComponent_box_img}>
                    <Image
                        src={images.creatorbackground1}
                        className={Style.daysComponent_box_img_img}
                        alt='profile background'
                        width={500}
                        height={300}
                        objectFit='covers'
                    />
                </div>
                <div className={Style.daysComponent_box_profile}>
                    <Image
                        src={images.creatorbackground2}
                        alt='profile'
                        width={200}
                        height={200}
                        className={Style.daysComponent_box_img_1}
                        objectFit='covers'
                    />
                    <Image
                        src={images.creatorbackground2}
                        alt='profile'
                        width={200}
                        height={200}
                        className={Style.daysComponent_box_img_2}
                        objectFit='covers'
                    />
                    <Image
                        src={images.creatorbackground2}
                        alt='profile'
                        width={200}
                        height={200}
                        className={Style.daysComponent_box_img_3}
                        objectFit='covers'
                    />
                </div>
                <div className={Style.daysComponent_box_title}>
                    <h2>Amazing Collection</h2>
                    <div className={Style.daysComponent_box_title_info}>
                        <div className={Style.daysComponent_box_title_info_profile}>
                            <Image
                                src={images.user1}
                                alt='profile'
                                width={30}
                                height={30}
                                className={Style.daysComponent_box_title_info_profile_img}
                                objectFit='covers'
                            />
                            <p>Creator</p>
                            <span>Prachi Dalmia<small><MdVerified/></small></span>
                        </div>
                        <div className={Style.daysComponent_box_title_info_price}>
                            <small> 1.276 ETH</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DaysComponent