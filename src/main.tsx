import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './pages/App'
import Tabajo2 from './pages/Tabajo'
import Home from './pages/Home'
import Listado from './pages/Listado'
import LinePlot from './pages/LinePlot'
import Mapa from './pages/Mapa'
import StakeHolder from './pages/StakeHolders'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  }, {
    path: '/trabajo',
    element: <Tabajo2 />,
  }, {
    path: '/app',
    element: <App />,
  },{
    path: '/list',
    element: <Listado/>,
  },{
    path: '/line',
    element: <LinePlot data={Array(50)}/>,
  },{
    path: '/map',
    element: <Mapa />,
  },{
    path: '/stakeholders',
    element: <StakeHolder />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className='bg-gray-900 min-h-screen'>
      <RouterProvider router={router} />

    </div>


  </React.StrictMode>,
)
