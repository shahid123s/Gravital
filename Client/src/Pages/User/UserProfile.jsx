import React from 'react'
import Sidebar from '../../Components/User/Sidebar'
import UserDetailsDisplay from '../../Components/User/UserProfileDisplayContent'
import UserPosts from '../../Components/User/UserPosts'

function UserProfile() {
  return (
    <div className=' min-h-screen flex '>
        <Sidebar/>
        <div className=' min-h-full ml-56 bg-[#757575] w-full'>
        <UserDetailsDisplay/>
        <UserPosts/>
        </div>
    </div> 
  )
}

export default UserProfile
