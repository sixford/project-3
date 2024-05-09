import axios from 'axios'
import { useEffect } from 'react'

function App() {


  useEffect(()=> {
    async function getAllUsers(){
      try {
        const {data} = await axios.get('/api/profile')
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    getAllUsers()
  }, [])


  return <h1>Hello World</h1>
}

export default App
