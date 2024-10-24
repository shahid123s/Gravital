import React from 'react'
import TiltedComponent from '../../Components/User/TiltedComponent'
import LoginComponent from '../../Components/User/LoginComponent'

function AdminLogin() {
  return (
    <div>
        <TiltedComponent isAdmin={true}>
            <LoginComponent isAdmin={true}>
            </LoginComponent>
        </TiltedComponent>
      
    </div>
  )
}

export default AdminLogin
