import axios from "axios"
import { useEffect, useState } from "react"
import { getToken } from "../../lib/auth"
import { Col, Row, Card, Container } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"
import backgroundImage from "../assets/future-showroom.jpg"

export default function HomeFeed() {

  // auth headers
  const args = { headers: { authorization: getToken() } }

  const [postData, setPostData] = useState()

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
      }
    }
    getPostData()
  }, [])

  return (
    <div
      className="home-feed-container"
      style={{ backgroundImage: `url(${backgroundImage})` }} // Set background image
    >
      <Container>
        <h1 className="text-center">Home Feed - Recent posts from others you follow</h1>
        <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
          {postData && postData.map(post => {
            // destructure vital data
            const { image, title, content, _id } = post
            return (
              // Generate card for each post
              <Col key={_id}>
                <Card style={{ cursor: "pointer" }} >
                  <Card.Img src={image} alt={title} id={_id} onClick={handleClick} />
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
    </div>
  )
}