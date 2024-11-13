import React from 'react'
import UserLogo from '../../assets/image.png'
function UserDetailsDisplay() {
    return (
        <div className='  flex flex-col  items-center w-full  bg-[#757575]  '>
            <div className=' w-full flex gap-9 justify-center items-center border-b border-[#f0f0f0f]   p-6 px-20 bg-inherit'>
                <div className='w-52 overflow-hidden rounded-full h-52 flex justify-center items-center bg-zinc-600'>
                    <img src={UserLogo} alt="" className='' />
                </div>
                <div className='w-56 flex flex-1 flex-col text-white font-poppins gap-3 bg-inherit '>
                    <div className='flex bg-inherit gap-20'>
                        <h1 className='text-3xl '>Shahid Noushad</h1>
                        <button className='bg-[#4A90E2] rounded-lg p-2'>Edit Profile</button>
                        <button className='bg-[#4A90E2] rounded-lg p-2'>View Activity</button>
                    </div>

                    <div className='flex bg-inherit ml-6 gap-20'>
                        <h1 className='text-xl  '><span className='font-numberFont'>10</span> Post </h1>
                        <h1 className='text-xl  '><span className='font-numberFont'>100K</span> Followers </h1>
                        <h1 className='text-xl  '><span className='font-numberFont'>10K</span> Followings </h1>
                    </div>

                    <div className='flex bg-inherit ml-6 gap-20'>
                        <h1 className='text-xl font-numberFont'>shahid_1</h1>

                    </div>
                    <div className='flex bg-inherit ml-6 gap-10 flex-wrap'>
                        <p>this is just a bio of a Instagram Id .</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetailsDisplay;
