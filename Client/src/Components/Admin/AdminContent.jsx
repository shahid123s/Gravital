import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axiosInstance from '../../utilities/axios'

function AdminContent({children, name,}) {
  const {isAdmin, accessToken} = useSelector(state => state.adminAuth)
  const[search, setSearch] = useState('')
  useEffect(() => {
    console.log(isAdmin, accessToken,) 
  },[])
  

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  const handleClick = (event) =>{
    event.preventDefault()
    // const response = axiosInstance.post('/user/api/post');
    console.log(search)

  }

  const childrenWithProp = React.Children.map(children, child  => {
    return React.cloneElement(child, {search})
  })
  

  return (  

    <div className=' flex-1 flex flex-col pl-56 bg-[#757575] min-h-screen'>
      {/* <button onClick={handleClick}> okay</button> */}
     <div className='bg-inherit flex  gap-96 items-center  '>
     <h1 className='bg-inherit text-4xl pl-4 pt-2 text-white font-poppins'>{name}</h1>
      <form className='bg-inherit flex items-center  mt-3 ml-auto mr-5 gap-5 '>
      <input type="text" value={search} onChange={handleChange} placeholder='Search' className='bg-[#D9D9D9] rounded-lg p-2 px-6' />
      <button className='bg-[#333333] text-white p-2 rounded-lg' onClick={handleClick} type='submit'>Search</button>
      </form>
     </div>
      <br />
      <hr/>
      {childrenWithProp}
      
    </div>

)
}


export default AdminContent
