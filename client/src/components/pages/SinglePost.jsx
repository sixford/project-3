import axios from "axios"
import { Button } from "react-bootstrap"
import { useEffect, useState } from "react"
import { Card, Container } from "react-bootstrap"
import { useParams } from "react-router-dom"

export default function SinglePost() {

    // When single post is loaded, the post Id should be passed through in the params
    const [post, setPost] = useState()
    const { postId } = useParams()

    useEffect(() => {
        async function getPost() {
            try {
                const { data } = await axios.get(`/api/posts/${postId}`)
                setPost(data)
                console.log("Post: ", data)
            } catch (error) {
                console.log(error)
            }
        }

        getPost()
    }, [])

    return (
        <Container>
            {post ?
                <Card className='single-post'>
                    <Card.Header className="d-flex justify-content-between" >
                        {post.owner.username}
                        <div className="follow-and-like">
                            <Button>Follow</Button>
                            <Button>Like</Button>
                        </div>
                    </Card.Header> {/* On click should navigate to Owner's page*/}
                    <Card.Img src={post.image} />
                    <Card.Body>
                        <Card.Title>{post.title}</Card.Title>
                        <Card.Text>{post.content}</Card.Text>

                    </Card.Body>
                </Card >
                : ""
            }
        </Container >
    )
}