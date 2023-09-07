import React from 'react'
import Image from 'next/image'

//internal import

import Style from './Video.module.css';
import images from '../../img';


const Video = () => {
    return (
        <div className={Style.video}>
            <div className={Style.video_box}>
                <h1>
                    <span>🎥</span> The Videos
                </h1>
                    <p>
                        Checkout the trending videos from all over the world.<br/>
                        Don't worry!! <br/>
                        Float's got you covered..
                    </p>
                <div className={Style.video_box_frame}>
                    <div className={Style.video_box_frame_left}>
                        <Image src={images.NFTvideo} alt='Video image' width={1920} height={1080} objectFit='cover' className={Style.video_box_frame_left_img}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Video