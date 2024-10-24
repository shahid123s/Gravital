import React from 'react'
import Sidebar from '../../Components/User/Sidebar'
import Content from '../../Components/User/Content'
import Suggestion from '../../Components/User/Suggestion'

function Home() {
  return (
    <div className='h-screen flex'>
      <Sidebar/>
      <Content/>
      <Suggestion/>

    </div>
  )
}

export default Home
