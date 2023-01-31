import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './views/App'
import Catalogue from './views/Catalogue'
import Login from './views/Login'
import Profile from './views/Profile'
import './index.css'
import Toast from './views/components/Toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toast/>
  </React.StrictMode>,
)
