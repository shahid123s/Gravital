import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'
import store from './app/store.js'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>

    <ToastContainer/>
    <App />
    </Provider>
  </StrictMode>,
)
