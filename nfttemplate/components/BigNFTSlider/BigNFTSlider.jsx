import React, { useState, useEffect, useCallback } from 'react';
import { AiFillFire, AiFillHeart, AiOutlineHeart } from 'react-icons/ai'; 
import { MdVerified, MdTimer } from 'react-icons/md';
import Image from 'next/image';
import{TbArrowBigLeftLine, TbArrowBigRightLine} from 'react-icons/tb'

//internal import
import Style from './BigNFTSlider.module.css';
import images from '../../img';
import Button from '../Button/Button'


const BigNFTSlider = () => {
  const [idNumber, setIdNumber] = useState(0);

  const sliderData = [
    {
      title: "Gift NFT",
      id: 1,
      name: "Piyush Dalmia",
      collection: "BasketBall",
      price: "00000064664 ETH",
      like: 243,
      image: images.user1,
      nftImage: images.nft_image_1,
      time: {
        days: 27,
        hours: 10,
        minutes: 11,
        seconds: 35
      },
    },
    {
      title: "Book NFT",
      id: 2,
      name: "Prachi Dalmia",
      collection: "Books",
      price: "00000098664 ETH",
      like: 999999999999,
      image: images.user2,
      nftImage: images.nft_image_2,
      time: {
        days: 7,
        hours: 19,
        minutes: 51,
        seconds: 30
      }
    },
    {
      title: "IAS NFT",
      id: 3,
      name: "Pankaj Dalmia",
      collection: "MONEY",
      price: "0008232324ETH",
      like: 1334,
      image: images.user3,
      nftImage: images.nft_image_3,
      time: {
        days: 37,
        hours: 9,
        minutes: 19,
        seconds: 24
      }
    },
    {
      title: "CARE",
      id: 4,
      name: "Suman Dalmia",
      collection: "LOVE",
      price: "9999999999999ETH",
      like: 9999999999,
      image: images.user4,
      nftImage: images.nft_image_1,
      time: {
        days: 13,
        hours: 6,
        minutes: 57,
        seconds: 59
      }
    },
    ];
    
//---inc
    const inc = useCallback(() => {
        if(idNumber + 1 < sliderData.length){
            setIdNumber(idNumber + 1);
        }
    }, [idNumber, sliderData.length])

//--------dec

    
    const dec = useCallback(() => {
        if(idNumber > 0){
            setIdNumber(idNumber - 1);
        }
    },[idNumber])

    // useEffect(() => {
    //     inc();
    // }, []);
  return (
    <div className={Style.bigNFTSlider}>
      <div className={Style.bigNFTSlider_box}>
        <div className={Style.bigNFTSlider_box_left}>
          <h2>{sliderData[idNumber].title}</h2>
          <div className={Style.bigNFTSlider_box_left_creator}>
            <div className={Style.bigNFTSlider_box_left_creator_profile}>
              <Image
                className={Style.bigNFTSlider_box_left_creator_profile_img}
                src={sliderData[idNumber].image}
                alt="profile image"
                width={50}
                height={50}
              />
              <div className={Style.bigNFTSlider_box_left_creator_profile_img}>
                <p>Creator</p>
                <h4>
                  {sliderData[idNumber].name}{" "}
                  <span><MdVerified /></span>
                </h4>
              </div>
            </div>
            <div className={Style.bigNFTSlider_box_left_creator_collection}>
              <AiFillFire
                className={Style.bigNFTSlider_box_left_creator_collection_icon}
              />
              <div className={Style.bigNFTSlider_box_left_creator_collection_info}>
                <p>Collection</p>
                <h4>{sliderData[idNumber].collection}</h4>
              </div>
            </div>
          </div>
          <div className={Style.bigNFTSlider_box_left_bidding}>
            <div className={Style.bigNFTSlider_box_left_bidding_box}>
              <small>Current Bid</small>
              <p>
                {sliderData[idNumber].price}
                <span>$22,121</span>
              </p>
            </div>
            <p className={Style.bigNFTSlider_box_left_bidding_box_auction}>
              <MdTimer
                className={Style.bigNFTSlider_box_left_bidding_box_icon}
              />
              <span>Auction ending in....</span>
            </p>
            <div className={Style.bigNFTSlider_box_left_bidding_box_timer}>
              <div className={Style.bigNFTSlider_box_left_bidding_box_timer_item}>
                <p>{sliderData[idNumber].time.days}</p>
                <span>Days</span>
              </div>
              <div className={Style.bigNFTSlider_box_left_bidding_box_timer_item}>
                <p>{sliderData[idNumber].time.hours}</p>
                <span>Hours</span>
              </div>
              <div className={Style.bigNFTSlider_box_left_bidding_box_timer_item}>
                <p>{sliderData[idNumber].time.minutes}</p>
                <span>Minutes</span>
              </div>
              <div className={Style.bigNFTSlider_box_left_bidding_box_timer_item}>
                <p>{sliderData[idNumber].time.seconds}</p>
                <span>Seconds</span>
              </div>
                      </div>
                      <div className={Style.bigNFTSlider_box_left_button}>
                          <Button btnName="Place" handleClick={() => { }} />
                          <Button btnName="View" handleClick={() => { }} />
                      </div>
                      <div className={Style.bigNFTSlider_box_left_sliderBtn}>
                          <TbArrowBigLeftLine className={Style.bigNFTSlider_box_left_sliderBtn_icon}
                          onClick={()=> dec()}
                          />
                          <TbArrowBigRightLine className={Style.bigNFTSlider_box_left_sliderBtn_icon}
                          onClick={()=> inc()}
                          />
                          </div>

                     </div>
                       </div>
                            <div className={Style.bigNFTSlider_box_right}>
                              <div className={Style.bigNFTSlider_box_right_box}>
                              <Image src={sliderData[idNumber].nftImage} alt="NFT IMAGE"
                              className={Style.bigNFTSlider_box_right_box_img} />
                              <div className={Style.bigNFTSlider_box_right_box_like}>
                              <AiFillHeart />
                              <span>{sliderData[idNumber].like}</span>
                              </div>
                             </div>
                           </div>
      </div>
    </div>
  );
};

export default BigNFTSlider;
