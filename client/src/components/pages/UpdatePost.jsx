import { useState } from 'react'
import axios from 'axios'
import { getToken } from '../../lib/auth.js'
import FormModal from '../subcomponents/FormModal.jsx'

import Button from 'react-bootstrap/Button'

export default function UpdatePost({id, reloadData}) {

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: '',
    })
    const [show, setShow] = useState(false)
    const [error, setError] = useState('')
    
    const [userId, setUserId] = useState('')

    const headers = { headers: { authorization: getToken() } }

    //For The Modal
    const handleClose = () => {
        setShow(false)
    }


    //Autofill Fields
    const handleShow = async (e) => {
        setShow(true);
        setUserId(e.target.id);
        try {
          const {data} = await axios.get(`/api/posts/${e.target.id}`,headers);
          setFormData(data._doc);
        } catch (error) {
          console.log(error);
          setError(error.response.data);
        }
      }

    //Update Post
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
          await axios.put(`/api/posts/${userId}`, formData, headers);
          setFormData({ title: '', content: '', image: null });
          setError('')
          reloadData()
          setShow(false)
        } catch (error) {
          console.log(error);
          setError(error.response.data);
        }
      }

    return (
        <>
            <Button id={id} variant="warning" onClick={handleShow}>
                Update
            </Button>
            <FormModal
                show={show}
                handleClose={handleClose}
                handleSubmit={handleUpdate}
                title="Update"
                formData={formData}
                setFormData={setFormData}
                error={error}
                setError={setError}
            />

        </>
    )
}