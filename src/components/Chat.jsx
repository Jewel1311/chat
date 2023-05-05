import React, { useContext } from 'react'
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../context/ChatContext';


function Chat() {
  const { data } = useContext(ChatContext);

  return (
      <div className='cont'>
      <div className="navbar chatdet p-2" style={{ backgroundColor: "#64788f"}}>
        <div className="d-flex align-items-center">
          <img src={data.user.photoURL} alt='' className='rounded-circle' width={40} height={40} />
          <div className='fw-bold text-white mx-2'>{data.user.displayName}</div>
        </div>
      </div>
      <Messages />
      <Input/>
    </div>

  )
}

export default Chat