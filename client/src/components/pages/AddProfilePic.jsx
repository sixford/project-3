import { useState } from 'react';
import axios from 'axios';
import { getToken } from '../../lib/auth.js';

// Bootstrap Components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

// Custom Components
import ImageUpload from '../elements/ImageUpload.jsx';

export default function AddProfilePic() {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleImageUpload = (uploadedImage) => {
    setImage(uploadedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = getToken();
      const formData = new FormData();
      formData.append('image', image);

      await axios.post('/api/profile/image', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      handleClose();
    } catch (err) {
      setError(err.response.data.message || 'An error occurred while uploading the image.');
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Profile Picture
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <ImageUpload onUpload={handleImageUpload} />
            {error && <p className="text-danger">{error}</p>}
            <Button variant="primary" type="submit" >
              Upload
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}