import { useState } from 'react'
import axios from 'axios'
import { getToken } from '../../lib/auth.js'
import FormModal from '../subcomponents/FormModal.jsx'

import Button from 'react-bootstrap/Button'


export default function AddPost({ fetchUserData }) {

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: '',
    })
    const [show, setShow] = useState(false)
    const [error, setError] = useState('')

    //For The Modal
    const handleClose = () => {
        setShow(false)
        clearForm()
    }
    const handleShow = () => {
        setShow(true)
    }

    const headers = { headers: { authorization: getToken() } }

    const clearForm = () => {
        setFormData({ title: '', content: '', image: null })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/api/posts/', formData, headers)
            clearForm()
            handleClose()
            fetchUserData()
        } catch (error) {
            setError(error.response.data);
            console.log(error.response.data.message)
        }
    }
    
    return (
        <>
            <Button className="my-3 px-4 py-2 add-post" onClick={handleShow}>
                Add a Post
            </Button>
            <FormModal
                show={show}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                title="Add a New Post"
                formData={formData}
                setFormData={setFormData}
                error={error}
                setError={setError}
                isCreate={true}
            />
        </>
    );
}