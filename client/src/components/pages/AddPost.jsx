import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap';

export default function AddPost() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            <Button variant="primary" className='my-3' onClick={handleShow}>
                Add Post
            </Button>

            < Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Dummy Text</p>
                 </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}> Cancel </Button>
                    <Button variant="primary">Create Post</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}



