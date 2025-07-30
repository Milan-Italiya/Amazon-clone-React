import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Navbar from './components/Header/Navbar'
import NewNavbar from './components/Header/NewNavbar'
import MainComponent from './components/Home/MainComponent'
import Register from './components/Authentication/Register'
import Login from './components/Authentication/Login'
import Cart from './components/Cart/Cart'
import Buy from './components/Buy/Buy'
import { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function App() {
  const [data, setData] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setData(true)
    }, 3000);
  }, [])

  return (
    <>
      {
        data ? (
          <>
            <Navbar />
            <NewNavbar />
            <Routes>
              <Route path='/' element={<MainComponent />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/getproducts/:id' element={<Cart />} />
              <Route path='/buy' element={<Buy />} />
            </Routes>
            <Footer />
          </>
        ) :
          <div className="circle">
            <CircularProgress/>
            <h2>Loading...</h2>
          </div>
      }

    </>
  )
}

export default App
