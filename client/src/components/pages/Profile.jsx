import PropTypes from 'prop-types';
import { Container, Row, Col, Nav, Card, Button } from 'react-bootstrap'

export default function Profile({ user }) {
  // Example posts data
  const posts = user.posts || []; // Assuming user.posts is an array of post objects

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
  );
}

Profile.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    posts: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
}

    



