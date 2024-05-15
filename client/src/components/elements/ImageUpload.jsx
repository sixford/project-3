import axios from "axios"
import { useState } from "react"
import { Form } from "react-bootstrap"


export default function ImageUpload({ formData, setFormData }) {

    const [error, setError] = useState('')

    const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET
    const uploadUrl = import.meta.env.VITE_CLOUDINARY_URL

    async function handleUpload(e) {
        // console.dir(e.target.files[0])
        const form = new FormData()
        form.append('file', e.target.files[0])
        form.append('upload_preset', uploadPreset)
        try {
            const { data } = await axios.post(uploadUrl, form)
            console.log(data.secure_url)
            setFormData({ ...formData, image: data.secure_url })
        } catch (error) {
            console.log(error)
            setError(error.message)
        }
    }
    return (
        <>
        {/* {formData.image ?
                <img src={formData.image} alt='Uploaded image' />
                :
                <> */}
                    <Form.Group controlId="image">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleUpload}
                            required
                        />
                    </Form.Group>
                {/* </>
        } */}
        </>
    )
}