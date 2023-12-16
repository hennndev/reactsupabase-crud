import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    const handleNavigate = (route: string) => {
        navigate(route)
    }
    return (
        <NavbarContainer>
            <div className='flex-between sub-container'>
                <h1 className='navbar-title'>React Supabase</h1>
                <ul className='flexx nav-links'>
                    <li onClick={() => handleNavigate('/')}>Home</li>
                    <li onClick={() => handleNavigate('/tambah-produk')}>Tambah produk</li>
                </ul>
            </div>
        </NavbarContainer>
    )
}

const NavbarContainer = styled.header`
    max-width: 1300px;
    margin: 0 auto;
    .sub-container {
        margin: 10px;
    }
    .navbar-title {
        font-size: 20px;
        font-weight: 500;
    }
    .nav-links {
        list-style: none;
        li {
            margin-right: 15px;
            &:hover {
                text-decoration: underline;
                cursor: pointer;
            }
        }
    }
`

export default Navbar