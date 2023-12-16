import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Modal from '../components/Modal';
import { useNavigate } from 'react-router-dom';
import { MdModeEdit, MdDelete } from "react-icons/md";
import { supabase } from '../supabase/supabaseClient';
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, useDisclosure, Button } from '@chakra-ui/react'

const Home = () => {

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [idDelete, setIdDelete] = useState<null | number>(null)
    const [productsData, setProductsData] = useState<Array<ProductTypes>>([])

    const callData = async () => {
        const { data, error } = await supabase.from('products').select()
        if(error) {
            setProductsData([])
            setIsLoading(false)
        } else {
            setProductsData(data)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        setIsLoading(true)
        callData()
    }, [])

    const handleDeleteProduk = async (id: number) => {
        const response = await supabase
            .from('products')
            .delete()
            .eq('id', id)

        if(!response.error) {
            setProductsData(productsData.filter(data => data.id !== id))
            onClose()
        }
    }

    const handleOpenDeleteModal = (id: number) => {
        setIdDelete(id)
        onOpen()
    }

    if(isLoading) {
        return <p>Loading...</p>
    }
    
    return (
        <HomeContainer>
            <Modal 
                variant='delete' 
                type='confirm' 
                btnTitle='Delete' 
                isOpen={isOpen} 
                handleConfirm={() => handleDeleteProduk(idDelete as number)} 
                onClose={onClose} 
                modalTitle='Hapus Produk'>
                <p>Apakah anda yakin produk ini akan dihapus?</p>
            </Modal>
            {productsData.length > 0 ? (
                <TableContainer>
                    <Table variant='simple'>
                        <TableCaption>Tabel produk menggunakan supabase</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>No</Th>
                                <Th>Nama produk</Th>
                                <Th>Kategori produk</Th>
                                <Th>Harga produk</Th>
                                <Th>Detail produk</Th>
                                <Th>Aksi</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {productsData.map((data, index) => (
                                <Tr key={data.id}>
                                    <Td>{index + 1}</Td>
                                    <Td>{data.nama_produk}</Td>
                                    <Td>{data.kategori_produk}</Td>
                                    <Td>Rp.{data.harga_produk}</Td>
                                    <Td>
                                        <Button variant='ghost' size='sm' colorScheme='gray'>Detail produk</Button>
                                    </Td>
                                    <Td>
                                    <div className='flexx'>
                                            <MdModeEdit className='ikon-edit' onClick={() => navigate(`/edit-produk/${data.id}`)}/>
                                            <MdDelete className='ikon-delete' onClick={() => handleOpenDeleteModal(data.id)}/>
                                    </div>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            ): (
                <div className='flex-center'>
                    <p>Data kosong</p>
                </div>
            )}
        </HomeContainer>
    )
}

export default Home



const HomeContainer = styled.section`
    max-width: 1300px;
    margin: 50px auto;
    .gambar-produk {
        height: 50px;
        object-fit: contain;
    }
    .aksi-container {
        flex-direction: row;
    }
    .ikon-edit {
        font-size: 20px;
        color: #3081D0;
        margin-right: 10px;
        cursor: pointer;
    }
    .ikon-delete {
        font-size: 20px;
        color: #FA7070;
        cursor: pointer;
    }
`


