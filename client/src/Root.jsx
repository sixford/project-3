import { Outlet } from 'react-router-dom'

// imports for each component e.g navbar, footer go here

import Navbar from './components/subcomponents/Navbar'
import Footer from './components/pages/Footer'

export default function Root({ children }) {

  return (
    <div className='d-flex flex-column min-vh-100'>
      {/* Header / Nav */}
      <Navbar />

      {/* Main Page Content */}
      <main className='flex-grow-1 d-flex flex-column'>
        { children || <Outlet />}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

