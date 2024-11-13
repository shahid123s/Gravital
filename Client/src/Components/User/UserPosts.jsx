import React from 'react'
import { Link } from 'react-router-dom'
import MiniPostCard from './MiniPostCard'

function UserPosts() {
  return (
    <div className='bg-inherit text-lg text-white p-1 flex flex-col font-poppins justify-center items-center gap-10'>
        <div className='bg-inherit flex gap-32 flex-wrap'>
            <Link className='hover:text-[#4A90E2]'>Posts</Link>
            <Link className='hover:text-[#4A90E2]'>Poll History</Link>
            <Link className='hover:text-[#4A90E2]'>Mentions</Link>
        </div>
        <div className='bg-inherit flex flex-wrap  gap-5  justify-center items-center p-5' >
            <MiniPostCard/>
            <MiniPostCard/>
            <MiniPostCard/>
            <MiniPostCard/>
            <MiniPostCard/>
            <MiniPostCard/>
            <MiniPostCard/>
            <MiniPostCard/>
            <MiniPostCard/>
        </div>
    </div>
  )
}

export default UserPosts
