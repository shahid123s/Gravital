import React from 'react';
import ProfilePic from '../assets/image.png';
import { Link } from 'react-router-dom';
import MoreButton from '../assets/threedot.svg';
import LikeButton from '../assets/heart.svg'

function PostCard() {
  return (
    <div className='flex flex-col justify-center items-center font-poppins w-[99%] px-4 py-7 rounded-2xl gap-5'>
        <div className='flex justify-between text-[#99775C]  h-11 w-11/12'>
            <div className='flex items-center gap-5'>
            <div className='w-10 h-10 flex items-center overflow-hidden rounded-full'>
                <img src={ProfilePic} alt="" />
            </div>
                <Link className='font-poppins text-lg'>Shahid Noushad <span className='text-sm'> shahid_1 </span></Link>

            </div>
            <button ><img src={MoreButton} alt="" /></button>
        </div>
        <div className='flex w-11/12'>
        <p className='font-poppins '>
            this is just a rough Caption for this post 
        </p>
        </div>

        <div className='w-11/12 overflow-hidden rounded-2xl'>
        
        <img src={ProfilePic} alt="" />

        </div>

        <div className='w-11/12 flex  justify-around '> {/* ith oru component akkanam marakkallee...... */}
            <button className='  flex gap-4 items-center '><img className='w-5' src={LikeButton} alt="" />1.2K</button>
            <button className='  flex gap-4 items-center '><img className='w-5' src={LikeButton} alt="" />1.2K</button>
            <button className='  flex gap-4 items-center '><img className='w-5' src={LikeButton} alt="" />1.2K</button>
            <button className='  flex gap-4 items-center '><img className='w-5' src={LikeButton} alt="" />1.2K</button>
            <button className='  flex gap-4 items-center '><img className='w-5' src={LikeButton} alt="" />1.2K</button>
           
        </div>
    </div>
  )
}

export default PostCard
