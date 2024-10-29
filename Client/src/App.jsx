import { useState , lazy, Suspense} from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route , Navigate} from 'react-router-dom'
import Home from './Pages/User/Home'
import Login from './Pages/User/Login'
import OTPVerification from './Pages/User/OTPVerification'
import LoadingSpinner from './Components/LoadingSpinner'
import AdminLogin from './Pages/Admin/AdminLogin'
import AdminHome from './Pages/Admin/AdminHome'
import AdminUsersList from './Pages/Admin/AdminUsersList'

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
         <Route path='/admin'>
         <Route index element= {<AdminLogin/>}  replace />
         <Route path='login' element={<AdminLogin/>} />
         <Route path='home'element={<Navigate to={'/admin/dashboard'} replace /> } />
         <Route path='dashboard' element={<AdminHome/>}/> 
         <Route path='users' element={<AdminUsersList/>} />
         </Route>
        </Routes>
      </Router>
    </Suspense>

    </>
  )
}

export default App
