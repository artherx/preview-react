import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Class8 from './Class8.tsx'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className='body-class' style={{height:"100vh", display:'flex' }}>

      <App />
    </div>
  </React.StrictMode>,
)
