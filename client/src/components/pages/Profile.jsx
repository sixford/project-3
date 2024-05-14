import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Nav, Card, Button, Modal } from 'react-bootstrap'
import axios from 'axios'
import { getToken } from '../../lib/auth.js'
import AddPost from './AddPost.jsx'
import UpdatePost from './UpdatePost.jsx'
import LoadingSpinner from '../subcomponents/LoadingSpinner.jsx'

import CarsOwned from './CarsOwned.jsx'


export default function Profile() {
  // State
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [likes, setLikes] = useState([])
  const [follows, setFollows] = useState([])
  const [activeTab, setActiveTab] = useState('posts') // State to track active tab
  const [error, setError] = useState()

  const [cars, setCars] = useState([])
  // const [error, setError] = useState('')

  const navigate = useNavigate()

  // For modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Local Variables
  const headers = { headers: { authorization: getToken() } }


  function clickProfile(e) {
    navigate(`/profile/${e.target.id}`)
    console.log(e.target)
  }

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
      setError(error)
      console.error('Error fetching user data:', error)
    }
  }

  function handleSelectPost(e) {
    navigate(`/posts/${e.target.id}`)
  }

  // Effects
  useEffect(() => {
    fetchUserData()
  }, [])

  // Render
  if (!user) {
    return <div className='d-flex justify-content-center '>{error && <p className='error'>{error.response.data.message}</p> || <LoadingSpinner />} </div>
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
      handleClose()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container className="profile-container" >
      <Row>
        <Col md={3} className="border-right">
          <div className="sidebar">
            <h4 className='mt-2'>{user.username}</h4>
            <img className="profile-pic" src={user.profilePic}></img>
            <CarsOwned fetchUserData={fetchUserData} cars={cars} />
            <p>Friends</p>
          </div>
        </Col>
        <Col md={9}>
          <Nav variant="tabs" defaultActiveKey="/posts" className='d-flex justify-content-end profile-nav'>
            <Nav.Item >
              <Button className='nav-item' variant="link" onClick={() => handleTabChange('posts')} active={activeTab === 'posts'}>Posts</Button>
            </Nav.Item>
            <Nav.Item >
              <Button className='nav-item' variant="link" onClick={() => handleTabChange('likes')} active={activeTab === 'likes'}>Likes</Button>
            </Nav.Item>
            <Nav.Item >
              <Button className='nav-item' variant="link" onClick={() => handleTabChange('follows')} active={activeTab === 'follows'}>Follows</Button>
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
                      <Card>
                        <Card.Img variant="top" src={post.image} id={post._id} onClick={handleSelectPost} className='profile-card-post' />
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
                                Delete Post
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </Card.Body>
                      </Card>
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
                    <Col key={follow._id} md={4} className="mb-3">
                      {/* <Link to={`/profile/${follow.id}`}> */}
                      <Card className='user-card' onClick={clickProfile} id={follow._id}>
                        <Card.Img className='w-25' src={follow.profilePic}></Card.Img>
                        <Card.Text className='user-card-text' >{follow.username}</Card.Text>
                      </Card>
                      {/* ?</Link> */}
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




