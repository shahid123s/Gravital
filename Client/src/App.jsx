import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route , Navigate} from 'react-router-dom'
import Register from './Pages/User/Register'
import Sidebar from './Components/User/Sidebar'
import Home from './Pages/User/Home'
import Login from './Pages/User/Login'
import AdminLogin from './Pages/Admin/AdminLogin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
         <Route path='/' >
         <Route index element = { <Navigate to= {'login'}  replace/>} />
         <Route path='register' element= {<Register/>} />
         <Route path='login' element= {<Login/>} />
         <Route path='home' element= {<Home/>} />

         </Route>
        </Routes>
      </Router>

    </>
  )
}

export default App
