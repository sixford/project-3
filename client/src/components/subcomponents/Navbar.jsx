import { Link } from 'react-router-dom'
// import { useState }
// import axios from 'axios'
import homeImage from '../assets/garage-home.png'

export default function NavBar() {
  const isLoggedIn = true

  return (
    <nav className="navbar navbar-expand-md bg-body-black border-bottom" style={{ backgroundColor: 'blue' }}>
      <div className="container">
        {isLoggedIn && (
          <button className="btn navbar-btn navbar-font">
            <Link to="/">
            <img src={homeImage} alt="Home" width="50" height="50" />
            </Link>
          </button>
        )}
        <button className="btn navbar-btn navbar-font">
          <Link to="/profile">Profile</Link>
        </button>
        <button className="btn navbar-btn navbar-font">
          <Link to="/">Logout</Link>
        </button>
        {/* Add other navbar items here */}
      </div>
    </nav>
  )
}

  