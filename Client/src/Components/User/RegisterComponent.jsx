import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axiosInstance from '../../utilities/axios';

function RegisterComponent() {
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState({
        username: '',
        email : '',
        password : '',
        confirmPassword : '',
    });
    

    const handleChange = (event) => {
        const {value, name} = event.target;
        console.log(import.meta.env.VITE_BASE_URL)
        setUserData({...userData, [name] : value})
    }

    const handleSubmit =async (event) => {
        event.preventDefault();
        await axiosInstance.post('/user/api/register', userData)
        console.log(userData)
    }

  return (
    <div className='pb-5  flex flex-col gap-5   sm:p-2   sm:w-96   md:w-96  md:p-8 items-center rounded-lg justify-center bg-[#f9f9f9]' >
        <h2 className='text-24px font-poppins font-normal text-[#000]' >REGISTER</h2>
        {error && <p className='text-red-500'>Username is Already used</p>}
        <form action="" 
        onSubmit={handleSubmit}
        className='flex flex-col   gap-3  md:gap-4 w-full '
        >
            <div className='flex flex-col gap-1 w-full'>
            <label htmlFor="username"
            className='text-[#99775C] font-medium text-lg'
            >Username</label>
            <input 
            type="text" 
            name="username" 
            id="username" 
            placeholder='Value'
            onChange={handleChange}
            className='w-76 rounded-md px-3 py-2  border-1 border-black'
             />
            </div>
            <div className='flex flex-col gap-1 w'>
             <label htmlFor="username"
             className='text-[#99775C] font-medium text-lg'
             >Email</label>
             <input 
             type="text" 
             name="email" 
             id="username" 
             onChange={handleChange}
             placeholder='Value'
             className='w-76 rounded-md px-3 py-2  border-1 border-black'
            
              />
            </div>
            <div className='flex flex-col gap-1 w'>
              <label htmlFor="username"
            className='text-[#99775C] font-medium text-lg'
            >Password</label>
            <input 
            type="text" 
            name="password" 
            id="username" 
            onChange={handleChange}
            placeholder='Value'
            className='w-76 rounded-md px-3 py-2  border-1 border-black'
             />
            </div>
            <div className='flex flex-col gap-1 w'>
             <label htmlFor="username"
            className='text-[#99775C] font-medium text-lg'
            >Confirm Password</label>
            <input 
            type="text" 
            onChange={handleChange}
            name="confirmPassword" 
            id="username" 
            placeholder='Value'
            className='w-76 rounded-md px-3 py-2  border-1 border-black'
             /> 
            </div>
            <input type="submit" value="Sign up" 
            className='bg-[#2c2c2c] rounded-md py-2 text-white font-poppins'/>

        </form>
        <Link className='text-[#99775C] cursor-pointer hover:underline'>Already have account?</Link>
        
    </div>
  )
}

export default RegisterComponent
