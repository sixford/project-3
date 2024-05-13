//Bootstrap Component
import {Button, Form, Modal} from 'react-bootstrap';

//Custom Components
import ImageUpload from '../elements/ImageUpload.jsx'

export default function FormModal({ show, handleClose, handleSubmit, title, formData, setFormData, error, setError }) {
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    }

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Add a title to your post"
                            name='title'
                            onChange={handleChange}
                            value={formData.title}
                            autoFocus
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="content">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            name='content'
                            onChange={handleChange}
                            value={formData.content}
                            placeholder="Share something about this post "
                            required
                        />
                    </Form.Group>
                    {/* //!ADDED custom component here form elements/ -viv */}
                    <ImageUpload formData={formData} setFormData={setFormData}/>
                    {error && <p className='text-danger text-center my-2'>{error.message}. Complete all fields.</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};
