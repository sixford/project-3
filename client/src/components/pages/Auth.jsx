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

    //For Login/Register States
    const [isSignup, setIsSignUp] = useState(false)

    const switchStatus = () => {
        setIsSignUp((previousState) => !previousState)
    }


    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    //Function to handle submit
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            if (isSignup) {
                const { data: { token } } = await axios.post('/api/register/', formData)
                setToken(token)
                navigate("/")
            } else {
                const { data: { token } } = await axios.post('/api/login/', {
                    email: formData.email,
                    password: formData.password
                })
                setToken(token)
                navigate("/")
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='form-page flex-grow-1 d-flex flex-column justify-content-center align-items-center'>
            <div className>
                <img src="https://www.svgrepo.com/show/506724/lock.svg" alt="lock" width='100px' />
            </div>

            <h2>{isSignup ? 'Sign Up' : 'Sign In'}</h2>
            <form className="d-flex flex-column " onSubmit={handleSubmit}>
                {isSignup && (
                    <>
                        <label htmlFor="username">Username</label>
                        <input type='text' name='username' id='username' placeholder='Username' onChange={handleChange} value={formData.username} />

                    </>
                )}
                <label htmlFor="email">Email</label>
                <input type='email' name='email' id='email' placeholder='Email' onChange={handleChange} value={formData.email} />
                <label htmlFor="password">Password</label>
                <input type='password' name='password' id='password' placeholder='Password' onChange={handleChange} value={formData.password} />
                {isSignup && (
                    <>
                        <label htmlFor="passwordConfirmation">Confirm Password</label>
                        <input type='password' name='passwordConfirmation' id='passwordConfirmation' placeholder='Confirm Password' onChange={handleChange} value={formData.passwordConfirmation} />
                    </>
                )}

                <button type='submit' className='btn btn-primary mt-3'>
                    {isSignup ? 'Sign Up' : 'Sign In'}
                </button>
                <div>
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