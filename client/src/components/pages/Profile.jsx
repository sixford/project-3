import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Nav, Card, Button, Modal } from 'react-bootstrap'
import axios from 'axios'
import { getToken } from '../../lib/auth.js'
import AddPost from './AddPost.jsx'
import UpdatePost from './UpdatePost.jsx'
import DeleteImg from '../assets/x-letter.svg'
import UpdateImg2 from '../assets/update2.png'
import UpdateImg from '../assets/update.png'

import CarsOwned from './CarsOwned.jsx'


export default function Profile() {
  // State
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [likes, setLikes] = useState([])
  const [follows, setFollows] = useState([])
  const [activeTab, setActiveTab] = useState('posts') // State to track active tab

  const [cars, setCars] = useState([])
  // const [error, setError] = useState('')

  // For modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Local Variables
  const headers = { headers: { authorization: getToken() } }

  // Fetch user data
  async function fetchUserData() {
    try {
      const { data } = await axios.get('/api/profile', headers)
      setUser(data);

      // Set user posts, likes, and follows
      setPosts(data.posts || [])
      setLikes(data.likes || [])
      setFollows(data.following || [])
      setCars(data.cars)
      // console.log(data)
    } catch (error) {
      console.error('Error fetching user data:', error.message)
    }
  }

  // Effects
  useEffect(() => {
    fetchUserData()
  }, [])

  // Render
  if (!user) {
    return <div>Loading...</div>
  }
  // onClick
  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  async function deletePost(e) {
    const postId = e.target.id
    try {
      await axios.delete(`/api/posts/${postId}`, headers)
      const { data } = await axios.get(`/api/profile`, headers)
      setUser(data)
      setPosts(data.posts || [])
      setLikes(data.likes || [])
      setFollows(data.following || [])
      setCars(data.cars)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container className="mt-5" style={{ border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
      <Row>
        <Col md={3} className="border-right">
          <div className="sidebar">
            <h4>{user.username}</h4>
            <CarsOwned fetchUserData={fetchUserData} cars={cars} />
            <p>Friends</p>
          </div>
        </Col>
        <Col md={9}>
          <Nav variant="tabs" defaultActiveKey="/posts">
            <Nav.Item>
              <Button variant="link" onClick={() => handleTabChange('posts')} active={activeTab === 'posts'}>Posts</Button>
            </Nav.Item>
            <Nav.Item>
              <Button variant="link" onClick={() => handleTabChange('likes')} active={activeTab === 'likes'}>Likes</Button>
            </Nav.Item>
            <Nav.Item>
              <Button variant="link" onClick={() => handleTabChange('follows')} active={activeTab === 'follows'}>Follows</Button>
            </Nav.Item>
          </Nav>
          <div className="mt-3">
            {activeTab === 'posts' && (
              <div>
                <h3>User Posts</h3>
                <AddPost fetchUserData={fetchUserData} />
                <Row>
                  {posts.map((post, index) => (
                    <Col key={index} md={4} className="mb-3">
                      <Link to={`/posts/${post._id}`} style={{ textDecoration: 'none' }}>
                        <Card style={{ cursor: 'pointer' }}>
                          <Card.Img variant="top" src={post.image} />
                          <Card.Body>
                            <Card.Title>{post.title}</Card.Title>
                            <Card.Text>{post.content}</Card.Text>
                            <UpdatePost id={post._id} reloadData={fetchUserData} />
                            <Button variant="danger" onClick={handleShow}>Delete</Button>
                            <Modal show={show} onHide={handleClose} animation={false}>
                              <Modal.Header closeButton>
                                <Modal.Title></Modal.Title>
                              </Modal.Header>
                              <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
                              <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                  Close
                                </Button>
                                <Button variant="danger" id={post._id} onClick={deletePost}>
                                  Save Changes
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </Card.Body>
                        </Card>
                      </Link>
                    </Col>
                  ))}
                </Row>
              </div>
            )}
            {activeTab === 'likes' && (
              <div>
                <h3>Likes</h3>
                <Row>
                  {likes.map((like, index) => (
                    <Col key={index} md={4} className="mb-3">
                      <Button
                        as={Link}
                        to={`/posts/${like._id}`}
                        variant="light"
                        className="p-0 border-0 text-left"
                        style={{ width: '100%', backgroundColor: 'transparent' }}
                      >
                        <Card>
                          <Card.Img variant="top" src={like.image} />
                          <Card.Body>
                            <Card.Title>{like.title}</Card.Title>
                            <Card.Text>{like.content}</Card.Text>
                          </Card.Body>
                        </Card>
                      </Button>
                    </Col>
                  ))}
                </Row>
              </div>
            )}
            {activeTab === 'follows' && (
              <div>
                <h3>Follows</h3>
                <Row>
                  {follows.map((follow, index) => (
                    <Col key={index} md={4} className="mb-3">
                      <Link to={`/profile/${follow.id}`}>
                        <Card>
                          <Card.Body>
                            <Card.Title>{follow.username}</Card.Title>
                          </Card.Body>
                        </Card>
                      </Link>
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  )
}




