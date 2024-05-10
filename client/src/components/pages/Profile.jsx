import { useState, useEffect } from 'react'
import { Container, Row, Col, Nav, Card, Button } from 'react-bootstrap'
import axios from 'axios'
import { getToken } from '../../lib/auth.js'

export default function Profile() {
  // State
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  // const [error, setError] = useState('')

  // Local Variables

  const headers = { headers : { authorization : getToken() }}


  // Effects
  useEffect(() => {
    async function fetchUserData() {
      try {
        // Make API call to fetch user data using axios
        const { data } = await axios.get('/api/profile', headers)
        setUser(data)
        console.log('User data:', data)
      // Include secureRoute/Bearer token/Authorization


        // Assuming user.POST contains user's posts
        const userPosts = data.posts || []
        setPosts(userPosts)
        console.log('User posts:', userPosts)
      } catch (error) {
        console.error('Error fetching user data:', error.message)
      }
    }

    fetchUserData()
  }, [])

  // Render
  if (!user) {
    return <div>Loading...</div>
  }

  console.log('Rendering profile component with user:', user)
  // (api/profile)
  //Make API call to send me back appropriate user.
  // user.POST

  //async function 
  //useEffect that gets called once when page loads 
  //try

  //catch



  return (
    <Container className="mt-5" style={{ border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
      <Row>
        <Col md={3} className="border-right">
          <div className="sidebar">
            <h4>{user.username}</h4>
            <p>Cars Owned</p>
            <p>Friends</p>
          </div>
        </Col>
        <Col md={9}>
          <Nav variant="tabs" defaultActiveKey="/overview">
            <Nav.Item>
              <Nav.Link href="/posts">Posts</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/likes">Likes</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/follows">Follows</Nav.Link>
            </Nav.Item>
          </Nav>
          <div className="mt-3">
            <h3>User Posts</h3>
            <Row>
              {posts.map((post, index) => (
                <Col key={index} md={4} className="mb-3">
                  <Card>
                    <Card.Img variant="top" src={post.image} />
                    <Card.Body>
                      <Card.Title>{post.title}</Card.Title>
                      <Card.Text>{post.content}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
          <Button variant="primary" className="mt-3">Add Post</Button> {/* Add Post button */}
        </Col>
      </Row>
    </Container>
  )
}


    



