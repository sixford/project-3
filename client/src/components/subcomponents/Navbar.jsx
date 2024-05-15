import { Link, NavLink, useNavigate } from 'react-router-dom'
import { isLoggedIn, removeToken } from '../../lib/auth'
import SearchInput from '../pages/SearchInput'
import homeImage from '../assets/garage-home.png'

export default function NavBar() {
  const navigate = useNavigate()

  function handleLogout() {
    removeToken()
    navigate('/')
  }

  return (
    <header>
      <nav className="navbar navbar-expand-md header" style={{ background: '#E6E6E6' }}>
        <div className="container ">
          <div >
            <Link className="navbar-brand" to={isLoggedIn() ? "/home" : '/'}>
              <img className="home-logo" src={homeImage} alt="Home" />
            </Link>
          </div>
          {isLoggedIn() && (
            <>
              <SearchInput />
              <div className='d-flex'>
                <NavLink className="nav-item" to="/profile">Profile</NavLink>
                <span type="button" className="nav-item" onClick={handleLogout}>Logout</span>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}



