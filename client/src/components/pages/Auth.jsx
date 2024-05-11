import { useState } from 'react'
import axios from 'axios'
import { setToken } from '../../lib/auth'
import { useNavigate } from "react-router-dom";

export default function Auth() {

    //Local variable
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    })

    const [error, setError] = useState('')

    //For Login/Register States
    const [isSignup, setIsSignUp] = useState(true)

    const switchStatus = () => {
        setIsSignUp((previousState) => !previousState)
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setError('')
    }

    //Function to handle form submission
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            if (isSignup) {
                await axios.post('/api/register/', formData)
                navigate("/Auth")
                switchStatus()
            } else {
                const { data: { token } } = await axios.post('/api/login/', {
                    email: formData.email,
                    password: formData.password
                })
                setToken(token)
                navigate("/")
            }
        } catch (error) {
            setError(error.response.data)
            console.log(error.response.data)
        }
    }

    return (
        <div className='form-page flex-grow-1 d-flex flex-column justify-content-center align-items-center'>
            <div >
                <img src="https://www.svgrepo.com/show/506724/lock.svg" alt="lock" width='100px' />
            </div>

            <h2>{isSignup ? 'Sign Up' : 'Sign In'}</h2>
            <form className="d-flex flex-column " onSubmit={handleSubmit}>
                {isSignup && (
                    <>
                        <div className='form-floating mb-3'>
                            <input type='text' className="form-control" name='username' id='username' placeholder='Username' onChange={handleChange} value={formData.username} />
                            <label htmlFor="username">Username</label>
                        </div>

                    </>
                )}
                <div className='form-floating mb-3'>
                    <input type='email' className="form-control" name='email' id='email' placeholder='Email' onChange={handleChange} value={formData.email} />
                    <label htmlFor="email">Email</label>
                </div>

                <div className='form-floating mb-3'>
                    <input type='password' className="form-control" name='password' id='password' placeholder='Password' onChange={handleChange} value={formData.password} />
                    <label htmlFor="password">Password</label>
                </div>
                {isSignup && (
                    <>
                        <div className='form-floating mb-3'>
                            <input type='password' className="form-control" name='passwordConfirmation' id='passwordConfirmation' placeholder='Confirm Password' onChange={handleChange} value={formData.passwordConfirmation} />
                            <label htmlFor="passwordConfirmation">Confirm Password</label>
                        </div>
                    </>
                )}


                <button type='submit' className='btn btn-primary mt-3'>
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </button>
                <div>
                    {error && <p className='text-center mt-3 text-danger' >Please insure your details are correct..</p>}
                    <div>
                        <button type='button' className='btn btn-secondary m-4' onClick={switchStatus}>
                            {isSignup ? 'Already have an account? Sign In' : 'New here? Create an Account '}
                        </button>
                    </div>
                </div>

            </form>

        </div>
    )
}