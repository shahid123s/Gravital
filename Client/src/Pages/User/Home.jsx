import React from 'react'
import Sidebar from '../../Components/User/Sidebar'
import Content from '../../Components/User/Content'
import Suggestion from '../../Components/User/Suggestion'

function Home() {
  return (
    <div className=' min-h-screen flex '>
      <Sidebar/>
      <div className='flex justify-evenly w-full'>
      <Content/>
      <Suggestion/>
      </div>

    </div>
  )
}

export default Home
