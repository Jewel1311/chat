import React, { useEffect, useState, useContext } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';


function Chats() {

  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)


  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data())
      });
      return () => {
        unsub();
      }
    }
    currentUser.uid && getChats()
  }, [currentUser.uid]);

  const handleSelect = (u) =>{
    dispatch({type:"CHANGE_USER", payload:u})
  }

  return (
    <div className='overflow-auto'>
      {chats && Object.entries(chats).sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div className='my-2 d-flex click' key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
          <img src={chat[1].userInfo.photoURL} className='rounded-circle' alt='' width={50} height={50} />
          <div className="chatinfo">
            <div className='mx-2 fw-bold text-white'>{chat[1].userInfo.displayName}</div>
            <p className='mx-2 fs-6 text-white'>{chat[1].lastMessage && chat[1].lastMessage.text}</p>
          </div>
        </div>

      ))}
    </div>
  );
};

export default Chats;


