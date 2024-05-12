import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getToken } from "../../lib/auth";

export default function SingleProfile() {

    const [userData, setUserData] = useState()
    const params = useParams()

    const args = { headers: { authorization: getToken() } }

    useEffect(() => {
        async function getData() {
            try {
                const { data } = await axios.get(`/api/profile/${params.userId}`, args)
                setUserData(data)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }

        getData()
    }, [])
}