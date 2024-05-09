import { BrowserRouter, Route, Routes } from 'react-router-dom'

// imports for each component e.g navbar, footer go here

export default function Root () {

  return (
    <BrowserRouter>

    <header>
      <Navbar />
    </header>


    <main>


      <Routes>
        <Route path = "/" element={<Home />}>
        </Route>
        <Route path = "/" element={<Profile />}>
        </Route>
        <Route path = "/" element={<Register />}>
        </Route>
        <Route path = "/" element={<Login />}>
        </Route>
        <Route>
        </Route>
      </Routes>
    </main>
    
    <Footer />
  </BrowserRouter>
  )
}
