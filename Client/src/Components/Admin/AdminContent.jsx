import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import axiosInstance from '../../utilities/axios'

function AdminContent() {
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

    <div className=' flex-1 flex flex-col items-center'>
      <button onClick={handleClick}> okay</button>
    </div>

)
}


export default AdminContent
