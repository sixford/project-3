import axios from "axios"
import { useEffect, useState } from "react"
import { getToken } from "../../lib/auth"
import { Col, Row, Card, Container } from 'react-bootstrap'

export default function HomeFeed() {

    // auth headers
    const args = { headers: { authorization: getToken() } }

    const [postData, setPostData] = useState()


    // call homefeed endpoint for post data
    useEffect(() => {
        async function getPostData() {
            try {
                const data = await axios.get('/api/homefeed', args)
                setPostData(data.data)
            } catch (error) {
                console.log(error)
            }
        }
        getPostData()
    }, [])

    return (

        <Container>
            <h1 className="text-center">Home Feed - Recent posts from others you follow</h1>
            <Row>
                {postData && postData.map(post => {
                    // destructure vital data
                    const { image, title, content, _id } = post
                    return (
                        // Generate card for each post
                        <Col xs={12} sm={6} m={4} lg={4} xl={3} key={_id} >
                            <Card style={{ width: "20rem" }}>
                                <Card.Img src={image} alt={title} />
                                <Card.Body>
                                    <Card.Title>{title}</Card.Title>
                                    <Card.Text>{content}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </Container>

    )
}