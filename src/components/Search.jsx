import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      if(querySnapshot.docs.length === 0){
        setErr(true)
      }
      else{
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
      }
    } catch (err) {
      setErr(true);
    }
  };


  const handleKey = (e) => {
    setErr(false)
    setUser(null)
    handleSearch();
  };

  

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("")
  };
  return (
    <div className='border border-end-0  border-start-0 border-top-0 py-1'>
      <div className="d-flex">
        <input type='text' placeholder='Find a user' className='w-100 form-control' onChange={e => setUsername(e.target.value)} value={username}/>
        <button onClick={handleKey} className="btn btn-primary">Search</button>
      </div>

        {user && 
          <div className='my-2 d-flex align-items-center click' onClick={handleSelect}>
              <img src={user.photoURL} alt='' width={50} height={50} className='rounded-circle'/>
              <div className="chatinfo">
                <div className='mx-2 fw-bold text-white'>{user.displayName}</div>
              </div>
          </div>
        }
        {err && <div className='my-2 p-1'>User not found</div>}

    </div>
  )
}

export default Search