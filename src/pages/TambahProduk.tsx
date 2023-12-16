import { useState } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Select, Textarea, Button, useToast } from '@chakra-ui/react'

type FormTypes = {
    namaProduk: string
    hargaProduk: number | string
    kategoriProduk: string
    deskripsiProduk: string
}

const TambahProduk = () => {

    const toast = useToast()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { register, formState: {errors}, handleSubmit, reset, clearErrors } = useForm<FormTypes>({defaultValues: {
        namaProduk: '',
        hargaProduk: '',
        kategoriProduk: '',
        deskripsiProduk: ''
    }})
    const onSubmit = (values: FormTypes) => {
        setIsLoading(true)
        const examplePromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                setIsLoading(false)
                resolve(200)
            }, 5000)
          })
        toast.promise(examplePromise, {
            success: { title: 'Promise resolved', description: 'Looks great' },
            error: { title: 'Promise rejected', description: 'Something wrong' },
            loading: { title: 'Promise pending', description: 'Please wait' },
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
                    <Select placeholder='Pilih Kategori' {...register('kategoriProduk', {
                        required: 'Field ini wajib diisi',
                    })}>
                        <option value='option2'>Laptop</option>
                        <option value='option3'>Smartphone</option>
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