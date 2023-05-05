import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'

function Sidebar() {
  return (
    <div className='mx-2 my-2 cont'>
        <Navbar/>
        <Search/>
        <Chats/>
    </div>
    
  )
}

export default Sidebar