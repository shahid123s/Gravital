import React , { useRef, useState, useEffect }from 'react'
import Logo from '../../assets/logo-white.svg';
import HomeLogo from '../../assets/homeIcon.svg';
import TrendingLogo from '../../assets/trending.svg';
import MessageLogo from '../../assets/comment.svg';
import NotificationLogo  from '../../assets/notification.svg';
import LiveLogo from '../../assets/live.svg';
import SearchLogo from '../../assets/search.svg';
import MoreLogo from '../../assets/more-circle-svgrepo-com.svg';
import LogoutLogo from '../../assets/out.svg';
import ReportLogo from '../../assets/exclamation.svg';
import LikeLogo from '../../assets/heart.svg';
import FavouriteLogo from '../../assets/saved-logo.svg';
import SettingsLogo from '../../assets/settings.svg';
import SidebarLinks from '../SidebarLinks';

function Sidebar() {
  const [isClicked, setIsClicked] =  useState(false);
  const dropdownRef = useRef(null); 
  const moreButtonRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (        dropdownRef.current && !dropdownRef.current.contains(event.target) && 
      moreButtonRef.current && !moreButtonRef.current.contains(event.target)) {
        setIsClicked(false); 
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  
  const handleClick = (event) => {
      event.preventDefault();
      isClicked? setIsClicked(false) :  setIsClicked(true) ;
  }
  // const handleLogout = ( ) => {

  // }

  return (

    <div   className='fixed flex flex-col left-0 bg-[#333333] w-56 h-screen items-center pt-10  '>
         <img src={Logo} alt=""  className='bg-transparent w-11/12 mb-7 hover:p-'  />
         <div className='bg-inherit flex-col flex gap-9 items-start'>
            <SidebarLinks logo={HomeLogo} name={'Home'} textColor={'white'}/>
            <SidebarLinks logo={TrendingLogo} name={'Trending'} />
            <SidebarLinks logo={SearchLogo} name={'Search'} />
            <SidebarLinks logo={LiveLogo} name={'Live'} />
            <SidebarLinks logo={MessageLogo} name={'Message'} />
            <SidebarLinks logo={NotificationLogo} name={'Notification'} />
            <SidebarLinks logo={NotificationLogo} name={'Profile'}/>
         </div>
         {isClicked &&  <div  ref={dropdownRef} className={`${
  'opacity-100 translate-y-0' 
  } mb-0 mt-auto p-4 rounded-xl bg-[#f3f3f3] top-1 relative flex flex-col justify-end gap-2 transition-all duration-300 ease-in-out`}>
          <SidebarLinks logo={ReportLogo} name={"Report Spam"} textColor={'dark'} textSize={'small'} />
          <SidebarLinks logo={FavouriteLogo} name={"Favourites"} textColor={'dark'} textSize={'small'} />
          <SidebarLinks logo={LikeLogo} name={"Liked"} textColor={'dark'} textSize={'small'} />
          <SidebarLinks logo={SettingsLogo} name={"Settings"} textColor={'dark'} textSize={'small'} />
          <hr className=' border-gray-800' />

         
          <SidebarLinks logo={LogoutLogo} name={"Logout"} textColor={'dark'} textSize={'small'} />
         </div>}
         <button  ref={moreButtonRef} className='mt-auto mb-5  w-1/6 gap-2 flex justify-end items-center'  onClick={handleClick}><img src={MoreLogo}/><span className='text-white text-md font-medium  '>More</span></button>
    </div>

  )
}

export default Sidebar
