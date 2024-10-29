import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import axiosInstance from '../../utilities/axios'

function AdminContent({childern, name}) {
  const {isAdmin, accessToken} = useSelector(state => state.adminAuth)
  
  useEffect(() => {
    console.log(isAdmin, accessToken,) 
  },[])
  

  const handleClick = (event) =>{
    event.preventDefault()
    const response = axiosInstance.post('/user/api/post');
    console.log(response)

  }

  return (  

    <div className=' flex-1 flex flex-col pl-56 bg-[#757575] min-h-screen'>
      {/* <button onClick={handleClick}> okay</button> */}
      <h1 className='bg-inherit text-4xl pl-4 pt-2 text-white font-poppins'>{name}</h1>
      {childern}
      <br />
      <hr/>
    </div>

)
}


export default AdminContent
