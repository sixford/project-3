
import heroBackground from '../assets/heroBackground.mp4'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="home-main">
      <video className='bg-black'autoPlay loop muted src={heroBackground} />
      <div className='hero-content d-flex flex-column align-items-center  justify-content-center'>
        <h1 className='display-1'>Welcome to Pedal</h1>
        <p className='h1'>Time to gear up!</p>
        <Link type="button" className="btn btn-primary btn-lg mt-4" to='/auth'>Login / Register</Link>
      </div>
    </div>
  )
}
