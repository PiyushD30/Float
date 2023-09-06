import React, {useState} from 'react'
import Image from 'next/image';
import { MdVerified } from 'react-icons/md';
import { TiTick } from 'react-icons/ti';

//internal import

import Style from './FollowerTabCard.module.css';
import images from '../../../img'
const FollowerTabCard = ({i, eL}) => {

    const [following, setFollowing] = useState(false);
    
  const followMe = () => {
      if (!following) {
          setFollowing(true);
      } else {
          setFollowing(false);
        }
    }
    
    return (
        <div className={Style.followerTabCard}>
            <div className={Style.followerTabCard_rank}>
                <p>
                    #{i + 1} <span>🏅</span>
                </p>
            </div>
            <div className={Style.followerTabCard_box}>
                <div className={Style.followerTabCard_box_img}>
                    <Image src={images.creatorbackground1} alt='profile background' width={500} height={300} objectFit='cover' />
                </div>
                <div className={Style.followerTabCard_box_profile}>
                    <Image className={Style.followerTabCard_box_profile_img} alt='profile picture' width={50} height={50}
                        src={images.user1}
                    />
                </div>
                <div className={Style.followerTabCard_box_info}>
                    <div className={Style.followerTabCard_box_info_name}>
                        <h4>Gianda Mann {""}{" "}<span><MdVerified /></span></h4>
                        <p>12.22 ETH</p>
                    </div>
                    <div className={Style.followerTabCard_box_info_following}>
                        {following ? (
                            <a onClick={() => followMe()}>
                                Follow{''}<span><TiTick /></span>
                            </a>
                        ) : (
                            <a onClick={() => followMe()}>
                                Following 
                            </a>  
                        )
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FollowerTabCard