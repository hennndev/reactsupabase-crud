import { useState } from 'react'
import styled from 'styled-components'
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, useDisclosure, Button } from '@chakra-ui/react'
import { MdModeEdit, MdDelete } from "react-icons/md";
import Modal from '../components/Modal';


const Home = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <HomeContainer>
            <Modal variant='delete' type='confirm' isOpen={isOpen} onClose={onClose} modalTitle='Hapus Produk'>
                <p>Apakah anda yakin produk ini akan dihapus?</p>
            </Modal>
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
                        <Tr>
                            <Td>1</Td>
                            <Td>Laptop ROG</Td>
                            <Td>Laptop</Td>
                            <Td>Rp.20.000.000</Td>
                            <Td>
                                <Button variant='ghost' size='sm' colorScheme='gray'>Detail produk</Button>
                            </Td>
                            <Td>
                               <div className='flexx'>
                                    <MdModeEdit className='ikon-edit'/>
                                    <MdDelete className='ikon-delete' onClick={onOpen}/>
                               </div>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
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


