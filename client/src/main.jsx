import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Root.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//Style Components
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import './styles/main.scss'


//Page components
import Auth from './components/pages/Auth.jsx'
import Home from './components/pages/Home.jsx'
import Profile from './components/pages/Profile.jsx'
import HomeFeed from './components/pages/HomeFeed.jsx'
import SinglePost from './components/pages/SinglePost.jsx'
import SingleProfile from './components/pages/SingleProfile.jsx'
import Search from './components/pages/Search.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'auth',
        element: <Auth />
      },
      {
        path: 'home',
        element: <HomeFeed />
      },
      {
        path: 'posts/:postId',
        element: <SinglePost />
      },
      {
        path: 'profile/:userId',
        element: <SingleProfile />
      },
      {
        path: 'search/:username',
        element: <Search />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
