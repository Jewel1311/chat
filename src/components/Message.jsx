import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';



function Message({message}) {

  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)

  const ref = useRef()

  const dte = message.date.toDate().toLocaleDateString()
  const time = message.date.toDate().toLocaleTimeString()

  useEffect(()=>{
    ref.current&& ref.current.scrollIntoView({behaviour:"smooth"})
  },[message])
  return (
    <div ref ={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className="messageinfo">
        <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" height={30} width={30} />
        <span className='smtext'>{dte}</span>
        <span className='smtext'>{time}</span>
      </div>
      <div className="messagecontent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  )
}

export default Message