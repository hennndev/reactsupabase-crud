import { useState } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { supabase } from '../supabase/supabaseClient'
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Select, Textarea, Button, useToast } from '@chakra-ui/react'


const TambahProduk = () => {

    const toast = useToast()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { register, formState: {errors}, handleSubmit, reset, clearErrors } = useForm<FormTypes>({defaultValues: {
        namaProduk: '',
        hargaProduk: '',
        kategoriProduk: '',
        deskripsiProduk: '',
        kondisiProduk: ''
    }})
    const onSubmit = async (values: FormTypes) => {
        setIsLoading(true)
        const insertDataPromise = new Promise(async(resolve, reject) => {
            const response = await supabase.from('products')
                .insert({
                    nama_produk: values.namaProduk,
                    harga_produk: values.hargaProduk,
                    kategori_produk: values.kategoriProduk,
                    deskripsi_produk: values.deskripsiProduk,
                    kondisi_produk: values.kondisiProduk
                })
                console.log(response)
            if(response.error) {
                reject('Data gagal upload')
                setIsLoading(false)
            } else {
                resolve(201)
                setIsLoading(false)
            }
        })
        toast.promise(insertDataPromise, {
            success: { title: 'Promise resolved', description: 'Data berhasil diupload' },
            error: { title: 'Promise rejected', description: 'Data gagal diupload' },
            loading: { title: 'Promise pending', description: 'Loading...' },
        })
    }

    const handleReset = () => {
        reset()
        clearErrors()
    }

    return (
        <TambahProdukContainer>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
                <h1 className='title'>Tambah produk</h1>
                {/* NAMA */}
                <FormControl className='input-control' isInvalid={Boolean(errors?.namaProduk?.message as string)}>
                    <FormLabel>Nama produk</FormLabel>
                    <Input type='text' {...register('namaProduk', {
                        required: 'Field ini wajib diisi',
                        minLength: {
                            value: 3,
                            message: 'Minimal panjang karakter field ini adalah 3 karakter'
                        }
                    })}/>
                    <FormErrorMessage>{errors?.namaProduk?.message}</FormErrorMessage>
                </FormControl>
                {/* HARGA */}
                <FormControl className='input-control' isInvalid={Boolean(errors?.hargaProduk?.message as string)}>
                    <FormLabel>Harga produk</FormLabel>
                    <Input type='number' placeholder='Rp' min={1} {...register('hargaProduk', {
                        required: 'Field ini wajib diisi',
                        min: {
                            value: 1000,
                            message: 'Minimal harga produk adalah Rp1000'
                        }
                    })}/>
                    <FormErrorMessage>{errors?.hargaProduk?.message}</FormErrorMessage>
                    <FormHelperText>Harga dalam bentuk rupiah.</FormHelperText>
                </FormControl>
                {/* KATEGORI */}
                <FormControl className='input-control' isInvalid={Boolean(errors?.kategoriProduk?.message as string)}>
                    <FormLabel>Kategori produk</FormLabel>
                    <Select placeholder='Pilih Kategori Produk' {...register('kategoriProduk', {
                        required: 'Field ini wajib diisi',
                    })}>
                        <option value='laptop'>Laptop</option>
                        <option value='smartphone'>Smartphone</option>
                    </Select>
                    <FormErrorMessage>{errors?.kategoriProduk?.message}</FormErrorMessage>
                </FormControl>
                {/* DESKRIPSI */}
                <FormControl className='input-control' isInvalid={Boolean(errors?.deskripsiProduk?.message as string)}>
                    <FormLabel>Deskripsi produk</FormLabel>
                    <Textarea rows={10} placeholder='Tulis deskripsi produk secara detail' {...register('deskripsiProduk', {
                        required: 'Field ini wajib diisi',
                        validate: (value) => {
                            return (value.match(/\n/g) || []).length === 0 || 'Value tidak boleh menggunakan new line!'
                        }
                    })}/>
                    <FormErrorMessage>{errors?.deskripsiProduk?.message}</FormErrorMessage>
                </FormControl>
                {/* KONDISI */}
                <FormControl className='input-control' isInvalid={Boolean(errors?.kondisiProduk?.message as string)}>
                    <FormLabel>Kondisi produk</FormLabel>
                    <Select placeholder='Pilih Kondisi Produk' {...register('kondisiProduk', {
                        required: 'Field ini wajib diisi',
                    })}>
                        <option value='baru'>Baru</option>
                        <option value='bekas'>Bekas</option>
                    </Select>
                    <FormErrorMessage>{errors?.kondisiProduk?.message}</FormErrorMessage>
                </FormControl>
                <Button isLoading={isLoading} loadingText='Submitting...' type='submit' variant='solid' colorScheme='blue' className='submit-button'>SUBMIT NEW PRODUK</Button>
                {!isLoading ? (
                    <Button type='button' variant='solid' colorScheme='red' onClick={handleReset}>CLEAR</Button>
                ) : null}
            </form>
        </TambahProdukContainer>
    )
}

export default TambahProduk


const TambahProdukContainer = styled.section`
    max-width: 1100px;
    margin: 50px auto;
    .form {
        padding: 15px;
    }
    .title {
        text-align: center;
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 20px;
    }
    .submit-button {
        margin-right: 10px;
    }
`