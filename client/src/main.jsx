import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Root.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


//Style Components
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'

//Page components
import Register from './components/Register.jsx'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'register',
        element: <Register/>
      },
      {
        path: 'login',
        element: <Login/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
