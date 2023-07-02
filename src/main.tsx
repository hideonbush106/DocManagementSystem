import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <ToastContainer transition={Slide} />
  </React.StrictMode>
)
