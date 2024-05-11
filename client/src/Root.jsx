import { Outlet } from 'react-router-dom'


// imports for each component e.g navbar, footer go here

import Navbar from './components/subcomponents/Navbar'
import Footer from './components/pages/Footer'

export default function Root({ children }) {

  return (
    <>
        {/* Header / Nav */}
        <Navbar />

        {/* Main Page Content */}
        {children || <Outlet />}
        
        {/* Footer */}
        {/*removed footer for now, positioning incorrect -  to be fixed */}

    </>
  )
}

