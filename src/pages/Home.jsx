import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'

function Home() {
  return (
    <div className="vh-100" style={{backgroundColor:"#c0d6f0"}}>
        <div className="row g-0 d-flex  justify-content-center" >
            <div className="col-md-3 my-4 rounded-start overflow-auto" style={{backgroundColor:"#64788f" ,minHeight:"90vh", maxHeight:"90vh"}} >
                <Sidebar/>
            </div>
            <div className="col-md-6 my-4 rounded-end overflow-auto " style={{backgroundColor:"#e9eef0",minHeight:"90vh", maxHeight:"90vh"}}>
                <Chat/>
            </div>
        </div>
    </div>
  )
}

export default Home