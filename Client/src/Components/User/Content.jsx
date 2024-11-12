import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../app/feature/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../utilities/axios';
function Content() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {isAuthenticate} = useSelector(state => state.userAuth)
  useEffect(() => {
    
    if(!isAuthenticate){
      navigate('/login')
    }
  },[])

  const handleLogout = async (event) => {
    event.preventDefault();
    dispatch(logout())
      .unwrap()
      .then((res) => {
        toast.success(res.message)
        navigate('/login')
        
      })
  }

  const handlePost = (event) => {
    event.preventDefault()
    axiosInstance.post('/post')
  }

  return (
    <div className='ml-64  flex flex-col h-full justify-center items-center w-full bg-inherit '>
      <div className='bg-blue-800  px-10 py-5 '>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      <p>okay now whatd</p>
      </div>
    </div>
  )
}

export default Content
