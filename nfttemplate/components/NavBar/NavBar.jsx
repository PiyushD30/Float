import React, {useState, useEffect} from 'react'
import Image from "next/image";
import Link from "next/link";

//-----import icon
import { MdNotifications } from 'react-icons/md';
import { BsSearch } from "react-icons/bs";
import { CgMenuLeft, CgMenuRight} from "react-icons/cg";


//internal import
import Style from './NavBar.module.css';
import { Discover, HelpCenter, Notification, Profile, SideBar } from './index';
import { Button } from '../componentsindex';
import images from '../../img';

const NavBar = () => {
    //----usestate components
    const [discover, setDiscover] = useState(false);
    const [help, setHelp] = useState(false);
    const [notification, setNotification] = useState(false);
    const [profile, setProfile] = useState(false);
    const [openSideMenu, setOpenSideMenu] = useState(false);


    const openMenu = (e) => {
        const btnText = e.target.innerText;
        if (btnText == 'Discover') {
            setDiscover(true);
            setHelp(false);
            setNotification(false);
            setProfile(false);
        }
        else if (btnText == 'Help Center') {
            setDiscover(false);
            setHelp(true);
            setNotification(false);
            setProfile(false);
        } else{
            setDiscover(false);
            setHelp(false);
            setNotification(false);
            setProfile(false);
        }
    }

    const openNotification = () => {
        if (!notification) {
            setDiscover(false);
            setHelp(false);
            setNotification(true);
            setProfile(false);
        } else {
            setNotification(false); 
        }
    }

const openProfile = () => {
   console.log("openProfile function called");
   if (!profile) {
        setDiscover(false);
        setHelp(false);
        setNotification(false);
        setProfile(true);
    } else {
        setProfile(false); 
    } 
}


const openSideBar = () => {
    if (!openSideMenu) {
        setOpenSideMenu(true);
    } else {
        setOpenSideMenu(false); 
    } 
}
   

    return (
        <div className={Style.navbar}>
            <div className={Style.navbar_container}>
                <div className={Style.navbar_container_left}>
                    <div className={Style.navbar_container}>
                        <Image src={images.logo} alt='NFT MARKET PLACE' width={100} height={100}/>
                    </div>
                    <div className={Style.navbar_container_left_box_input}>
                        <div className={Style.navbar_container_left_box_input_box}>
                            <input type='text' placeholder='Search NFT' />
                            <BsSearch onClick={() => {}} className={Style.search_icon}/>
                        </div>
                    </div>
                </div>
                {/*End of left section*/}

                <div className={Style.navbar_container_right}>
                    {/*discover menu*/}
                    <div className={Style.navbar_container_right_discover}>
                        <p onClick={(e) => openMenu(e)}>Discover</p>
                        {discover && (
                            <div className={Style.navbar_container_right_discover_box}>
                                <Discover />
                            </div>
                        )}
                    </div>

                    {/*Help center menu*/}
                    <div className={Style.navbar_container_right_help}>
                        <p onClick={(e) => openMenu(e)}>Help Center</p>
                        {help && (
                            <div className={Style.navbar_container_right_Help_box}>
                                <HelpCenter />
                            </div>
                        )}
                    </div>
                    
                    {/*Notification*/}
                    <div className={Style.navbar_container_right_notify}>
                        <MdNotifications className={Style.notify} onClick={() => openNotification()}/>
                        {notification && <Notification />}
                    </div>

                    {/* Create button section*/}
                    <div className={Style.navbar_container_right_button}>
                        <Button btnName='Create' handleClick={() => {}}/>
                    </div>

                    {/* User Profile*/}
                    <div className={Style.navbar_container_right_profile_box}>
                       <div className={Style.navbar_container_right_profile}>
                            <Image src={images.user1} alt='Profile' width={40} height={40} onClick={() => openProfile}
                                className={Style.navbar_container_right_profile}
                            />
                            {profile && <Profile/>}
                        </div>
                    </div>

                    {/*Menu Button*/}
                    <div className={Style.navbar_container_right_menuBtn}>
                        <CgMenuRight className={Style.menuIcon} onClick={() => openSideBar()}/>
                    </div>
                </div>
                {/*End of right section*/}

            </div>
            {/*SideBar Component*/}
            {openSideMenu && (
                <div className={Style.SideBar}>
                    <SideBar setOpenSideMenu={setOpenSideMenu} />
                </div>
            )}
        </div>
    );
};

export default NavBar;