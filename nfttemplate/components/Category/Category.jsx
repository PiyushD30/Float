import React from 'react';
import { BsCircleFill } from 'react-icons/bs';
import Image from 'next/image';
// Internal import

import Style from './Category.module.css';
import images from '../../img';

const Category = () => {
const CategoryArray =[images.creatorbackground1, images.creatorbackground2, images.creatorbackground3, images.creatorbackground5, images.creatorbackground7, images.creatorbackground10, images.creatorbackground4, images.creatorbackground6]
    return (
        <div className={Style.box_category}>
    <div className={Style.category}>
        {CategoryArray.map((el, i) => (
            <div className={Style.category_box} key={1 + 1}>
                <Image
                    src={el}
                    className={Style.category_box_img}
                    alt="Background Image"
                    width={350}
                    height={150}
                    objectFit="Cover"
                />
                <div className={Style.category_box_title}>
                    <span>
                        <BsCircleFill/>
                    </span>
                    <div className={Style.category_box_title_info}>
                        <h4>Entertainment</h4>
                        <small>69 NFTs</small>
                    </div>
                </div>
            </div>
        ))}     
    </div>
    </div>

  );
};

export default Category;
