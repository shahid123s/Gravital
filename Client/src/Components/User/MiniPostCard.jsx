import React from 'react'
import PostImage from '../../assets/image.png'
function MiniPostCard() {
  return (
    <div className='w-72 rounded-lg overflow-hidden'>
      <img src={PostImage} alt="" className='w-full'/>
    </div>
  )
}

export default MiniPostCard
