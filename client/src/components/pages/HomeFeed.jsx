import axios from "axios"
import { useEffect, useState } from "react"
import { getToken } from "../../lib/auth"

export default function HomeFeed() {

    const args = { headers: { authorization: getToken() } }



    const [postData, setPostData] = useState([])

    useEffect(() => {
        async function getPostData() {
            try {
                const data = await axios.get('/api/homefeed', args)
                setPostData(data)
                console.log("Posts", data)
            } catch (error) {
                console.log(error)
            }
        }
        getPostData()
    }, [])

    return (
        <>

        </>
    )
}