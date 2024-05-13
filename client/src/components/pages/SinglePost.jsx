import axios from "axios"
import { useEffect, useState } from "react"
import { Card, Container, Button, ListGroup, ListGroupItem } from "react-bootstrap"
import { useParams, Link } from "react-router-dom"
import { getToken } from "../../lib/auth.js"
// import jwt from 'jsonwebtoken'
// import 'dotenv/config'

export default function SinglePost() {

    // When single post is loaded, the post Id should be passed through in the params
    const [post, setPost] = useState()
    const { postId } = useParams()
    const [following, setFollowing] = useState()
    const [liked, setLiked] = useState()
    const [user, setUser] = useState()

    const args = { headers: { authorization: getToken() } }


    async function handleFollow(e) {
        try {
            await axios.post('/api/follow', { 'toFollow': post.owner._id }, args)
            following ? setFollowing(false) : setFollowing(true)
        } catch (error) {
            console.log(error)
        }
    }

    async function handleLike(e) {
        try {
            await axios.post('/api/like', { 'postId': post._id }, args)
            liked ? setLiked(false) : setLiked(true)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        async function getPost() {
            try {
                const { data } = await axios.get(`/api/posts/${postId}`, args)
                setPost(data._doc)
                setUser(data.currentUser)

                console.log("Post: ", data)

                // Dynamically change like and follow buttons
                data._doc.owner.followers.includes(data.currentUser) ? setFollowing(true) : setFollowing(false)
                data._doc.likes.includes(data.currentUser) ? setLiked(true) : setLiked(false)

            } catch (error) {
                console.log(error)
            }
        }

        getPost()


    }, [])


    return (
        <>
            {post ?
                <Container >
                    <div className="d-flex justify-content-center">
                        <Card className='single-post'>
                            <Card.Header className="d-flex justify-content-between" >
                                <Link to={`/profile/${post.owner._id}`}>{post.owner.username}</Link>
                                <div className="follow-and-like">
                                    <Button onClick={handleFollow} id='follow-button'>{following ? 'Following' : 'Follow'}</Button>
                                    <Button onClick={handleLike}>{liked ? 'Liked' : 'Like'}</Button>
                                </div>
                            </Card.Header> {/* On click should navigate to Owner's page*/}
                            <Card.Img src={post.image} />
                            <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Text>{post.content}</Card.Text>
                            </Card.Body>
                        </Card >
                        <Card className="single-post">
                            <Card.Header>Comments</Card.Header>
                            <ListGroup >
                                {post.comments.map(comment => {
                                    return <ListGroupItem key={comment._id}>
                                        {comment.text} <br />
                                        <div className="d-flex justify-content-between">
                                            <small>{comment.owner.username}</small>
                                            <small>{new Date(comment.updatedAt).toDateString()}</small>
                                        </div>

                                    </ListGroupItem>
                                })}
                            </ListGroup>
                        </Card>
                    </div>
                </Container >
                : "loading"
            }
        </>
    )
}