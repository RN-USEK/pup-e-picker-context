import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { PupProvider } from './Providers/pup-provider'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PupProvider >
    <App />
    </PupProvider>
  </React.StrictMode>
)
