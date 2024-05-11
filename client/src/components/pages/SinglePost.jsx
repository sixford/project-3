import axios from "axios"
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
                <Card>
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