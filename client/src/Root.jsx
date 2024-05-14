import { Outlet } from 'react-router-dom'


// imports for each component e.g navbar, footer go here

import Navbar from './components/subcomponents/Navbar'
import Footer from './components/pages/Footer'
import { removeToken } from './lib/auth'

export default function Root({ children }) {
  // Remove after retsrat
  removeToken()
  return (
    <>

      {/* Header / Nav */}
      <Navbar />

      {/* Main Page Content */}
      <main className='flex-grow-1 d-flex flex-column'>
        {children || <Outlet />}
      </main>

      {/* Footer */}
      {/*removed footer for now, positioning incorrect -  to be fixed  P.S. should be fixed now -viv*/}
      <Footer />

    </>
  )
}

