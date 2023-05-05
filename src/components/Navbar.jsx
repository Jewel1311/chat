import React, { useContext } from 'react';
import logo from "../img/chat.png";
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';


function Navbar() {
    const {currentUser} = useContext(AuthContext)
    return (
        <div className='navbar rounded px-2 chatdet' style={{backgroundColor:"#54556e"}}>
            <div className='text-white fw-bold d-flex align-items-center w-100 justify-content-between mx-1'>
                <img src={logo} width={30} height={30} alt="" />

                <div className="btn-group">
                    <div className=" dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <img className='rounded-circle' src={currentUser.photoURL} width={30} height={30} alt="" /> <span> {currentUser.displayName} </span>
                    </div>
                    <ul className="dropdown-menu dropdown-menu-end">
                        <li><button className="dropdown-item" type="button" onClick={() =>signOut(auth)}>Logout</button></li>
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default Navbar