import React from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import Image from 'next/image';
// Internal import

import Style from './Subscribe.module.css';
import images from '../../img';

const Subscribe = () => {
  return (
    <div className={Style.subscribe}>
      <div className={Style.subscribe_box}>
        <div className={Style.subscribe_box_left}>
          <h2>Never miss a new Launch</h2>
          <p>
            Subscribe to Float to be the first to buy the latest NFTs and make maximum benefits
          </p>
          <div className={Style.subscribe_box_left_box}>
            <span>01</span>
            <small>Get more discount</small>
          </div>
          <div className={Style.subscribe_box_left_box}>
            <span>02</span>
            <small>Get premium magazines</small>
          </div>
        </div>
        <div className={Style.subscribe_box_right}>
          <Image src={images.update} alt="get update" height={600} width={800} />
        </div>
      </div>
      <div className={Style.subscribe_box_left_input}>
        <input type="email" placeholder="Enter your email" />
        <RiSendPlaneFill className={Style.subscribe_box_left_input_icon} />
      </div>
    </div>
  );
};

export default Subscribe;
