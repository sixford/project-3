import { Outlet } from 'react-router-dom'


// imports for each component e.g navbar, footer go here

export default function Root() {

  return (
    <div>
      {/* <Navbar /> */}

      <main>
        <Outlet />
      </main>

      {/* <Footer /> */}
    </div>
  )
}
