import { Outlet } from 'react-router-dom'



import Navbar from './components/subcomponents/Navbar'
import Footer from './components/pages/Footer'

export default function Root({ children }) {
  return (
    <>
      <Navbar />

      <main className='flex-grow-1 d-flex flex-column'>
        {children || <Outlet />}
      </main>

      <Footer />
    </>
  )
}

