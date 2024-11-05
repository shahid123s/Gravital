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
    <div className='ml-64 flex-1 flex flex-col items-center'>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handlePost}> okay</button>
    </div>
  )
}

export default Content
