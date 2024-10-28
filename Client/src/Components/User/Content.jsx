import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../app/feature/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Content() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {isAuthenticate} = useSelector(state => state.userAuth)
  const handleLogout = async(event) => {
    event.preventDefault();
    dispatch(logout())
    .unwrap()
    .then((res) => {
      toast.success(res.message)
      console.log(isAuthenticate)
      navigate('/login')
    })
  }

  return (
    <div className='ml-64 flex-1 flex flex-col items-center'>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Content
