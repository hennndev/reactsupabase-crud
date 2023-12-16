import Home from './pages/Home'
import Navbar from './components/Navbar'
import EditProduk from './pages/EditProduk'
import TambahProduk from './pages/TambahProduk'
import { Routes, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

const App = () => {
    return (
        <ChakraProvider>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/tambah-produk' element={<TambahProduk/>}/>
                <Route path='/edit-produk/:id' element={<EditProduk/>}/>
            </Routes>
        </ChakraProvider>
    )
}

export default App