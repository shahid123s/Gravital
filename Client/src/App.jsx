import { useState , lazy, Suspense} from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route , Navigate} from 'react-router-dom'
// import Register from './Pages/User/Register'
import Sidebar from './Components/User/Sidebar'
import Home from './Pages/User/Home'
import Login from './Pages/User/Login'
import OTPVerification from './Pages/User/OTPVerification'
// import PersonalInformtion from './Pages/User/PersonalInformtion'
import LoadingSpinner from './Components/LoadingSpinner'

const Register = lazy(() => import ('./Pages/User/Register'));
const PersonalInformtion = lazy(() => import ('./Pages/User/PersonalInformtion'));

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Suspense fallback={<LoadingSpinner/>}>

      <Router>
        <Routes>
         <Route path='/' >
         <Route index element = { <Navigate to= {'login'}  replace/>} />
         <Route path='register' element= {<Register/>} >
         <Route path='personal-info' element={<PersonalInformtion/>} />
         </Route>
         <Route path='otp-verification' element = {<OTPVerification/>} />
         <Route path='login' element= {<Login/>} />
         <Route path='home' element= {<Home/>} />

         </Route>
        </Routes>
      </Router>
    </Suspense>

    </>
  )
}

export default App
