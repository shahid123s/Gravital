import { useState } from "react";
import { Link } from "react-router-dom"

function Otpverfication() {
    const [data, setData] = useState('')
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(data)
    }

    return (
        <div className='pb-5   flex flex-col gap-5   sm:p-2   sm:w-96   md:w-96  md:px-8 md:py-20  items-center rounded-lg justify-center bg-[#f9f9f9]' >
            <h2 className='text-24px font-poppins font-normal text-[#000]' >OTP verification</h2>
            {/* {error && <p className='text-red-500'>Username is Already used</p>} */}
            <form action=""
                onSubmit={{}}
                className='flex flex-col   gap-3  md:gap-8 w-full '
            >
                <div className='flex flex-col  gap-5 w-full'>
                    <label htmlFor="username"
                        className='text-[#99775C] text-md font-light '
                    >Please Enter the OTP send to the email. shah*********s@gmail.com</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder='Value'
                        // onChange={handleChange}
                        className='w-76 rounded-md px-3 py-2  border-1 border-black'
                    />
                </div>
                <input type="submit" value="Sign up"
                    className='bg-[#2c2c2c] rounded-md py-2 text-white font-poppins' />

            </form>
            <Link className='text-[#99775C] cursor-pointer hover:underline'>Resent OTP</Link>
            <Link className='text-[#99775C] cursor-pointer hover:underline'>Change your Email</Link>

        </div>
    )
}

export default Otpverfication
