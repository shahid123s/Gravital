import React from 'react'
import { Link } from 'react-router-dom'

function SidebarLinks({logo, name}) {
    const link = name.toLowerCase();
  return (
    <div className='flex  bg-inherit gap-3 justify-start items-center'>
    <img src={logo} alt="" className='w-6 bg-inherit'  />
    <Link className='bg-inherit text-white text-xl font-medium font-poppins'  to={`/admin/${link}`}>{name}</Link>
    </div>
  )
}

export default SidebarLinks
