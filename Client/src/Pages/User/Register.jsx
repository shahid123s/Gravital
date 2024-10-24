import React from 'react'
import TiltedComponent from '../../Components/User/TiltedComponent'
import RegisterComponent from '../../Components/User/RegisterComponent'
import LoginComponent from '../../Components/User/LoginComponent'
import Otpverfication from '../../Components/User/OtpVerfication'

function Register() {
  return (
    <div>
      <TiltedComponent>
        <RegisterComponent/>


      </TiltedComponent>
    </div>
  )
}

export default Register
