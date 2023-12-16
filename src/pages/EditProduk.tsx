import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { supabase } from '../supabase/supabaseClient'
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Select, Textarea, Button, useToast } from '@chakra-ui/react'

const EditProduk = () => {

    const toast = useToast()
    const params = useParams()
    const [dataProduct, setDataProduct] = useState<ProductTypes>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { register, formState: {errors}, setValue, handleSubmit, reset, clearErrors } = useForm<FormTypes>({defaultValues: {
        namaProduk:  '',
        hargaProduk: '',
        kategoriProduk: '',
        deskripsiProduk: '',
        kondisiProduk: ''
    }})
    const onSubmit = async (values: FormTypes) => {
        setIsLoading(true)
        const updateDataPromise = new Promise(async(resolve, reject) => {
            const response = await supabase.from('products')
                .update({
                    nama_produk: values.namaProduk,
                    harga_produk: values.hargaProduk,
                    kategori_produk: values.kategoriProduk,
                    deskripsi_produk: values.deskripsiProduk,
                    kondisi_produk: values.kondisiProduk
                })
                .eq('id', params.id)
            if(response.error) {
                reject('Gagal edit data produk')
                setIsLoading(false)
            } else {
                resolve(200)
                setIsLoading(false)
            }

        })
        toast.promise(updateDataPromise, {
            success: { title: 'Promise resolved', description: 'Data berhasil diedit' },
            error: { title: 'Promise rejected', description: 'Data gagal diedit' },
            loading: { title: 'Promise pending', description: 'Loading...' },
        })
    }

    useEffect(() => {
        const getDataProduct = async () => {
            const { data } = await supabase.from('products').select().eq('id', params.id)
            if(data) {
                setDataProduct(data[0])
            }
        }
        getDataProduct()
    }, [params.id])

    useEffect(() => {
        if(dataProduct) {
            setValue('namaProduk', dataProduct?.nama_produk)
            setValue('hargaProduk', dataProduct?.harga_produk)
            setValue('kategoriProduk', dataProduct?.kategori_produk)
            setValue('deskripsiProduk', dataProduct?.deskripsi_produk)
            setValue('kondisiProduk', dataProduct?.kondisi_produk)
        }
    }, [dataProduct])
    

    const handleReset = () => {
        reset()
        clearErrors()
    }

    return (
        <TambahProdukContainer>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
                <h1 className='title'>Edit produk</h1>
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
                    <Select placeholder='Pilih Kategori' {...register('kategoriProduk', {
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
                <Button isLoading={isLoading} loadingText='Submitting...' type='submit' variant='solid' colorScheme='blue' className='submit-button'>SUBMIT EDIT PRODUK</Button>
                {!isLoading ? (
                    <Button type='button' variant='solid' colorScheme='red' onClick={handleReset}>CLEAR</Button>
                ) : null}
            </form>
        </TambahProdukContainer>
    )
}

export default EditProduk


const TambahProdukContainer = styled.section`
    max-width: 1100px;
    margin: 50px auto;
    .form {
        border: 1px solid #ccc;
        border-radius: 6px;
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