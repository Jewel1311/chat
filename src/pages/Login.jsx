import React, { useState } from 'react'
import logo from "../img/chat.png";
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';


function Login() {
  const [err, setErr] = useState(false)
  const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;


        try {
         await signInWithEmailAndPassword(auth, email, password)
         navigate("/")
            
        } catch (err) {
            setErr(true);
        }
      }
  return (
    <div className='vh-100 d-flex align-items-center justify-content-center' style={{backgroundColor:"#9dc1fa"}}>
    <div className='shadow rounded px-4 py-5 col-md-3 col-6' style={{backgroundColor:"white"}}>
        <h4 className='text-center'><img src={logo} width={40} height={40} alt=""/> Login</h4>
        {err && <div className='bg-danger p-1 m-1 bg-opacity-25 text-center rounded text-danger'>Invalid Credentials </div>}

        <form onSubmit={handleSubmit}>
        <label className='mt-2'>Email</label>
        <input type='email' className='form-control '/>
        <label className='mt-3'>Password</label>
        <input type='password' className='form-control'/>
        <div className='text-center'><input type='submit' className='btn btn-primary mt-3'
        value={"Login"}/></div>
        <p className='my-3 text-decoration-none'>Don't have an account?<Link to="/register"> Sign up</Link></p>
        </form>
    </div>
</div>
  )
}

export default Login