import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getToken } from "../../lib/auth";
import { Container, Row, Col, Nav, Button } from "react-bootstrap";

export default function SingleProfile() {

    const [userData, setUserData] = useState()
    const [following, setFollowing] = useState()
    const [user, setUser] = useState()
    const params = useParams()

    const args = { headers: { authorization: getToken() } }


    async function handleFollow(e) {
        try {
            await axios.post('/api/follow', { 'toFollow': userData._id }, args)
            following ? setFollowing(false) : setFollowing(true)

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        async function getData() {
            try {
                const { data } = await axios.get(`/api/profile/${params.userId}`, args)
                setUserData(data._doc)
                data._doc.followers.includes(data.userId) ? setFollowing(true) : setFollowing(false)
                setUser(data.userId)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }

        getData()
    }, [])


    return (
        <Container>
            {userData ?
                <Row>
                    <Col md={3} className="border-right">
                        <div className="sidebar">
                            <h4>{userData.username}</h4>
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
                                <Nav.Link href="/follows">Following</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Button onClick={handleFollow}>{following ? 'Following' : 'Follow'}</Button>
                            </Nav.Item>
                        </Nav>
                    </Col>
                </Row> : ''}
        </Container>
    )
}