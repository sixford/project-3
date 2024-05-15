import { useState } from 'react';
import axios from 'axios';
import { getToken } from '../../lib/auth.js'
import { useParams } from 'react-router-dom';

//Bootstrap Components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

//Custom Components
import ImageUpload from '../elements/ImageUpload.jsx';


export default function AddCar({ fetchUserData, currentUser }) {
    //State
    const [formData, setFormData] = useState({
        make: '',
        model: '',
        image: '',
        mileage: '',
        year: ''
    })
    const [show, setShow] = useState(false)
    const [error, setError] = useState('')
    const params = useParams()
    //*Modal
    const handleClose = () => {
        setShow(false)
        clearForm()
    }
    const handleShow = () => {
        setShow(true)
    }

    //*Token 
    const headers = { headers: { authorization: getToken() } }


    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setError('')
    }


    function clearForm() {
        setFormData({ title: '', content: '', image: null })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            //Remove res -viv
            const res = await axios.post('/api/profile/cars', formData, headers)
            console.log(res)
            clearForm()
            handleClose()
            fetchUserData()
        } catch (error) {
            setError(error.response.data)
            console.log(error.response.data.message)
        }
    }


    return (
        <>
            {currentUser === params.userId && <Button variant="teal" className="my-3 px-1 py-1 add-car" onClick={handleShow}>Add a Car</Button>}
            <Modal show={show} onHide={handleClose} backdrop="static" centered>
                <Modal.Header closeButton>
                    <Modal.Title >Add a New Car</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="make">
                            <Form.Label>Make</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Make of Car"
                                name='make'
                                onChange={handleChange}
                                value={formData.make}
                                autoFocus
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 text-light" controlId="model">
                            <Form.Label>Model</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Model of Car"
                                name='model'
                                onChange={handleChange}
                                value={formData.model}
                                required
                            />
                        </Form.Group>
                        <ImageUpload formData={formData} setFormData={setFormData}/>
                        <Form.Group className="mb-3" controlId="mileage">
                            <Form.Label>Mileage</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Mileage of Car"
                                name='mileage'
                                onChange={handleChange}
                                value={formData.mileage}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="year">
                            <Form.Label>Year</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Year Purchased"
                                name='year'
                                onChange={handleChange}
                                value={formData.year}
                                required
                            />
                        </Form.Group>
                        {error &&
                            <p className='text-danger text-center my-2'>{error.message}. Complete all fields.</p>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit" className='add-car-btn' onClick={handleSubmit}>
                            Add Car
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}