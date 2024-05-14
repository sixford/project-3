import { Link, NavLink, useNavigate } from 'react-router-dom'
import { isLoggedIn, removeToken } from '../../lib/auth'

import homeImage from '../assets/garage-home.png'

export default function NavBar() {
  const navigate = useNavigate()

  function handleLogout() {
    removeToken()
    navigate('/')
  }

  return (
    <header>
      <nav className="navbar navbar-expand-md" style={{ background: 'linear-gradient(to right, white, black)' }}>
        <div className="container ">
          <div className='flex-grow-1'>
            <Link className="navbar-brand" to="/home">
              <img className="home-logo" src={homeImage} alt="Home" />
            </Link>
          </div>
          {isLoggedIn() && (
            <div>
              <NavLink className="nav-item" to="/profile">Profile</NavLink>
              <span type="button" className="nav-item" onClick={handleLogout}>Logout</span>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}



