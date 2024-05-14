import axios from "axios"
import { useEffect, useState } from "react"
import { getToken } from "../../lib/auth"
import { Col, Row, Card, Container } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"
import backgroundImage from "../assets/future-showroom.jpg"
import LoadingSpinner from "../subcomponents/LoadingSpinner"

export default function HomeFeed() {

    // auth headers
    const args = { headers: { authorization: getToken() } }

    const [postData, setPostData] = useState()

    const [error, setError] = useState()

    const navigate = useNavigate()

    function handleClick(e) {
        // for now you must click the image to load the single post page
        const _id = e.target.id
        navigate(`/posts/${_id}`)
    }
    // call homefeed endpoint for post data
    useEffect(() => {
        async function getPostData() {
            try {
                const data = await axios.get('/api/homefeed', args)
                setPostData(data.data)
                console.log(data.data)
            } catch (error) {
                console.log(error)
                setError(error)
            }
        }
        getPostData()
    }, [])

    return (
        <div className="homefeed"

            // style={{ backgroundImage: `url(${backgroundImage})` }} // Set background image
        >
            <Container className="home-feed-container">
                {postData ?
                    <>
                        <h1 className="text-center text-light my-4">Home Feed</h1>
                        <Row className="g-4">
                            {postData.map(post => {
                                // destructure vital data
                                const { image, title, _id } = post
                                return (
                                    // Generate card for each post
                                    <Col key={_id} xs={12} sm={6} md={4} lg={4} xl={4} >
                                        <Card style={{ cursor: "pointer" }} >
                                            <Card.Img src={image} alt={title} id={_id} onClick={handleClick} className='home-feed-card-img' />
                                            <Card.Body>
                                                <Card.Title className="card-title">{title}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })}
                        </Row>
                        s
                    </>
                    : <div className='d-flex justify-content-center' style={{ color: 'white' }}>{error ? <p className='error'>{error.message}</p> : <LoadingSpinner />}</div>}
            </Container>
        </div>
    )
}