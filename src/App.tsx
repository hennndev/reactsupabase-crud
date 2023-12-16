import Home from './pages/Home'
import {Routes, Route,  } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import Navbar from './components/Navbar'
import TambahProduk from './pages/TambahProduk'

const App = () => {
    return (
        <ChakraProvider>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/tambah-produk' element={<TambahProduk/>}/>
            </Routes>
        </ChakraProvider>
    )
}

export default App