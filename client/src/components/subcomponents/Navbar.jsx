import { Link, NavLink, useNavigate } from 'react-router-dom'
import { isLoggedIn, removeToken } from '../../lib/auth'

import homeImage from '../assets/garage-home.png'

export default function NavBar() {
  const isLoggedIn = true
  const navigate = useNavigate()

  return (


    <header>
      <nav className="navbar navbar-expand-md bg-black">
        <div className="container ">
          <div className='flex-grow-1'>
            <Link className="navbar-brand" to="/">
              <img className="home-logo" src={homeImage} alt="Home" />
            </Link>
          </div>
          <div>
              <NavLink className="nav-item" to="/profile">Profile</NavLink>
              <NavLink className="nav-item" to="/profile">Logout</NavLink>
          </div>
          {/* {isLoggedIn && (
          )} */}

        </div>
      </nav>
    </header>
  )
}