import React, { useState } from 'react';
import gallery from "../img/addAvatar.png";
import logo from "../img/chat.png";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from 'react-router-dom';
import chatuser from "../img/chatuser.png";



function Register() {

    const [err, setErr] = useState(false)
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        let file = e.target[3].files[0];

        if (!file){
            const blob = await fetch(chatuser).then((r) => r.blob());
            file = new File([blob], 'default-image.jpg', { type: 'image/jpeg' });
        }
        

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)

            const storageRef = ref(storage, displayName);

            const uploadTask = uploadBytesResumable(storageRef, file);

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on(
                (error) => {
                    setErr(true);  // Handle unsuccessful uploads
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        //create user on firestore
                        await updateProfile(res.user,{
                            displayName,
                            photoURL:downloadURL,
                        });
                        await setDoc(doc(db, "users", res.user.uid),{
                            uid:res.user.uid,
                            displayName,
                            email,
                            photoURL:downloadURL,
                        });

                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/");
                    });

                }
            );

        } catch (err) {
            setErr(true);
        }

    }

    return (
        <div className='vh-100 d-flex align-items-center justify-content-center' style={{ backgroundColor: "#9dc1fa" }}>
            <div className='shadow rounded px-4 py-5 col-md-3 col-9' style={{ backgroundColor: "white" }}>
                <h4 className='text-center '><img src={logo} width={40} height={40} alt="" /> Register</h4>
                {err && <div className='bg-danger p-1 m-1 bg-opacity-25 text-center rounded text-danger'>Failed to Register </div>}
                <form className='mt-5' onSubmit={handleSubmit}>
                    <input type='text' className="form-control my-3" placeholder='Display Name' required />
                    <input type='email' className='form-control my-3' placeholder='Email' required />
                    <input type='password' className='form-control my-3' placeholder='Password (atleast 6 characters)' required />
                    <input type='file' id='file' style={{ display: "None" }} />
                    <label htmlFor='file'><img src={gallery} alt="" width={30} /> Add an avatar</label>
                    <p className='my-3'>Have an account? <Link to="/login"> Login</Link> </p>
                    <div className='text-center'><input type='submit' className='btn btn-primary mt-3'
                        value={"Sign up"} /></div>
                </form>
            </div>
        </div>
    )
}

export default Register