import React, { useContext, useState } from 'react'
import image from "../img/image.png";
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';




function Input() {

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)

  const handleSend = async () =>{
    if(img){
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {  // Handle unsuccessful uploads
        },
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                //create user on firestore
                await updateDoc(doc(db,"chats",data.chatId),{
                  messages:arrayUnion({
                    id:uuid(),
                    text,
                    senderId:currentUser.uid,
                    date:Timestamp.now(),
                    img:downloadURL,
                  })
                })
            });

        }
    );

    }else{
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db,"userChats",currentUser.uid),{
      [data.chatId+ ".lastMessage"]:{
        text
      },
      [data.chatId+".date"]:serverTimestamp()
    })
    await updateDoc(doc(db,"userChats",data.user.uid),{
      [data.chatId+ ".lastMessage"]:{
        text
      },
      [data.chatId+".date"]:serverTimestamp()
    })

    setText("")
    setImg(null)
  }

  return (
    <div className='d-flex bg-white align-items-center border border-top-1 inputdet'>
      <input type='text' className='form-control p-3 rounded-0 border-0' placeholder='Type something...'
      onChange={e=> setText(e.target.value)} value={text}/>
      <input type="file" id="file" style={{display:"None"}}  onChange={e=>setImg(e.target.files[0])}/>
      <label htmlFor='file' className='px-2'>
        <img src={image} width={30} height={30} alt=''/>
      </label>
      <button className='btn btn-primary p-3 rounded-0' onClick={handleSend}>Send</button>
    </div>
  )
}

export default Input