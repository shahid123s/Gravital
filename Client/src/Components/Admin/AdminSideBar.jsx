import React from 'react'
import Logo from '../../assets/logo-white.svg'
import SidebarLinks from '../SIdebarLinks'
import dashboardLogo from '../../assets/dashboard.svg';
import commentLogo from '../../assets/comment.svg';
import premiumLogo from '../../assets/crown.svg';
import reportLogo from '../../assets/exclamation.svg';
import postLogo from '../../assets/post.svg';
import userLogo from '../../assets/user.svg';
function AdminSideBar() {
    
  return (
    <div className='fixed flex flex-col left-0 bg-[#333333] w-56 h-screen items-center pt-10 '>
        <img src={Logo} alt=""  className='bg-transparent w-11/12 mb-7'  />
        <div className='bg-inherit flex-col flex gap-9 items-start'>
        <SidebarLinks logo = {dashboardLogo} name= {'Dashboard'} ></SidebarLinks>
        <SidebarLinks logo = {userLogo} name= {'Users'} ></SidebarLinks>
        <SidebarLinks logo = {postLogo} name= {'Posts'} ></SidebarLinks>
        <SidebarLinks logo = {commentLogo} name= {'Comments'} ></SidebarLinks>
        <SidebarLinks logo = {reportLogo} name= {'Reports'} ></SidebarLinks>
        <SidebarLinks logo = {premiumLogo} name= {'Premium'} ></SidebarLinks>
        </div> 
    </div>
  )
}

export default AdminSideBar