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

    const [titleShow, setTitleShow] = useState()

    const navigate = useNavigate()

    const [nextPost, setNextPost] = useState()


    useEffect(() => {
        nextPost && navigate(`/posts/${nextPost}`)

    }, [nextPost])


    // for now you must click the image to load the single post page



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

    function hoverPost(e) {
        setTitleShow(e.target.id)
    }

    function unhoverPost(e) {
        setTitleShow(false)
    }

    return (
        <div className="homefeed flex-grow-1"

        // style={{ backgroundImage: `url(${backgroundImage})` }} // Set background image
        >
            <Container className="home-feed-container ">
                {postData ?
                    <>
                        <h1 className="text-center text-light my-4">Home Feed</h1>
                        <Row className="g-4 pb-4 d-flex">
                            {postData.map(post => {
                                // destructure vital data
                                const { owner, image, title, _id } = post
                                return (
                                    // Generate card for each post
                                    <Col key={_id} xs={12} sm={6} md={4} lg={4} xl={4} >
                                        <Card className="home-cards">
                                            <Card.Img src={image} alt={title} className={titleShow && titleShow === title ? 'home-feed-card-img-hover' : 'home-feed-card-img'} />
                                            <Card.ImgOverlay className="overlay d-flex flex-column justify-content-center "
                                                id={title} onMouseEnter={hoverPost} onMouseLeave={unhoverPost} onClick={() => setNextPost(_id)}>

                                                <div>{titleShow && <Card.Title className='post-title'>{title === titleShow ? title : ''}</Card.Title>}</div>
                                            </Card.ImgOverlay>
                                            <Card.Body className="py-2">
                                                <Card.Title className="card-title">{post.owner.username}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })}
                        </Row>
                    </>
                    : <div className='d-flex justify-content-center' style={{ color: 'white' }}>{error ? <p className='error'>{error.message}</p> : <LoadingSpinner />}</div>}
            </Container>
        </div>
    )
}