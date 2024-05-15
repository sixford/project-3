import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getToken } from "../../lib/auth";
import { Container, Row, Col, Nav, Button, Card } from "react-bootstrap";
import CarsOwned from './CarsOwned.jsx'
import LoadingSpinner from "../subcomponents/LoadingSpinner.jsx";

export default function SingleProfile() {

  const [userData, setUserData] = useState()
  const [following, setFollowing] = useState()
  const [user, setUser] = useState()
  const params = useParams()
  const [activeTab, setActiveTab] = useState('posts')
  const [error, setError] = useState()

  const args = { headers: { authorization: getToken() } }

  async function handleFollow(e) {
    try {
      await axios.post('/api/follow', { 'toFollow': userData._id }, args)
      following ? setFollowing(false) : setFollowing(true)

    } catch (error) {
      console.log(error)
      setError(error)
    }
  }

  async function getData() {
    try {
      const { data } = await axios.get(`/api/profile/${params.userId}`, args)
      data._doc.likes = data.$$populatedVirtuals.likes
      data._doc.posts = data.$$populatedVirtuals.posts
      setUserData(data._doc)
      data._doc.followers.includes(data.userId) ? setFollowing(true) : setFollowing(false)
      setUser(data.userId)
      console.log(data)
    } catch (error) {
      console.log(error)
      setError(error)

    }
  }

  useEffect(() => {

    getData()
  }, [])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }


  return (
    <div className='profile-page flex-grow-1'>
    <Container className={"profile-container"}>
      {userData ?
        <Row className="pb-5">
          <Col md={3} className="border-right">
            <div className="sidebar">
              <h4 className="text-center mt-2">{userData.username}</h4>
              <img className="profile-pic" src={userData.profilePic}></img>
              <CarsOwned fetchUserData={getData} cars={userData.cars} />
            </div>
          </Col>
          <Col md={9}>
            <Nav variant="tabs" defaultActiveKey="/posts" className='profile-nav d-flex justify-content-between'>

              <Nav.Item>
                <button className='follow-button' onClick={handleFollow}>{following ? 'Following' : 'Follow'}</button>
              </Nav.Item>
              <div className="d-flex">
                <Nav.Item >
                  <Button className='profile-nav-item' variant="link" onClick={() => handleTabChange('posts')} active={activeTab === 'posts'}>Posts</Button>
                </Nav.Item>
                <Nav.Item>
                  <Button className='profile-nav-item' variant="link" onClick={() => handleTabChange('likes')} active={activeTab === 'likes'}>Likes</Button>
                </Nav.Item>
                <Nav.Item>
                  <Button className='profile-nav-item' variant="link" onClick={() => handleTabChange('follows')} active={activeTab === 'follows'}>Follows</Button>
                </Nav.Item>
              </div>

            </Nav>
            <div className="mt-3">
              {activeTab === 'posts' && (
                <div>
                  <h3>User Posts</h3>
                  <Row>
                    {userData.posts.map((post, index) => (
                      <Col key={index} md={4} className="mb-3">
                        <Button
                          as={Link}
                          to={`/posts/${post._id}`}
                          variant="light"
                          className="p-0 border-0 text-left"
                          style={{ width: '100%', backgroundColor: 'transparent' }}
                        >
                          <Card>
                            <Card.Img variant="top" src={post.image} />
                            <Card.Body>
                              <Card.Title>{post.title}</Card.Title>
                              <Card.Text>{post.content}</Card.Text>
                            </Card.Body>
                          </Card>
                        </Button>
                      </Col>
                    ))}
                  </Row>
                </div>
              )}
              {activeTab === 'likes' && (
                <div>
                  <h3>Likes</h3>
                  <Row>
                    {userData.likes.map((like, index) => (
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
                    {userData.following.map((follow, index) => (
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
        </Row> : <div className="d-flex justify-content-center"> {error ? <p className="error">{error.message}</p> : <LoadingSpinner />}</div>}
    </Container>

    </div>
  )
}


