import axios from "axios"
import { useEffect, useState } from "react"
import { Card, Container, Button } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { getToken } from "../../lib/auth.js"

export default function SinglePost() {

    // When single post is loaded, the post Id should be passed through in the params
    const [post, setPost] = useState()
    const { postId } = useParams()
    const [following, setFollowing] = useState()

    const args = { headers: { authorization: getToken() } }


    async function handleFollow(e) {
        try {
            await axios.post('/api/follow', { 'toFollow': post.owner._id }, args)
            following ? setFollowing(false) : setFollowing(true)

        } catch (error) {
            console.log(error)
        }
    }




    useEffect(() => {
        async function getPost() {
            try {
                const { data } = await axios.get(`/api/posts/${postId}`, args)
                setPost(data._doc)
                data.followed ? setFollowing(true) : setFollowing(false)
                console.log("Post: ", data)
            } catch (error) {
                console.log(error)
            }
        }

        //const checkFollow = post.owner.username

        getPost()
    }, [])


    return (
        <Container>
            {post ?
                <Card className='single-post'>
                    <Card.Header className="d-flex justify-content-between" >
                        {post.owner.username}
                        <div className="follow-and-like">
                            <Button onClick={handleFollow} id='follow-button'>{following ? 'Unfollow' : 'Follow'}</Button>
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