import { Container, Row, Col, Nav, Card } from 'react-bootstrap'
export default function Profile( user ) {
  return (

        <Container className="mt-5" style={{ border: '1px solid #ccc', borderRadius: '5px' }}>
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
                  <Nav.Link href="/overview">Overview</Nav.Link>
                </Nav.Item>
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
              <Card className="mt-3">
                <Card.Body>
                  <h3>Posts</h3>
                  {/* Add user's posts here */}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )
    }