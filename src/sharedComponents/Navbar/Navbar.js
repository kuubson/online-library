import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import removeCookie from '../../resources/helpers/removeCookie'

import NavbarBrand from './NavbarBrand'
import NavbarItems from './NavbarItems'
import NavbarItem from './NavbarItem'

const NavbarWrapper = styled.div`
    background: linear-gradient(90deg,#4facfe 0,#00f2fe);
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    padding: 25px 15px;
    margin: 20px;
`;

const Navbar = ({ store, profile, history, cart }) => {
    const dispatch = useDispatch()
    const showBookUploader = () => dispatch({ type: 'setShouldBookUploaderAppear', payload: true })
    const navigate = where => {
        history.push(where)
    }
    const logout = () => {
        removeCookie('token')
        history.push('/login')
    }
    return (
        <NavbarWrapper>
            <NavbarBrand />
            <NavbarItems>
                {(store || cart) && <NavbarItem onClick={() => navigate('/profile')}>My profile</NavbarItem>}
                {(profile || cart) && <NavbarItem onClick={() => navigate('/store')}>Store</NavbarItem>}
                <NavbarItem onClick={showBookUploader}>Upload own book</NavbarItem>
                {!cart && <NavbarItem onClick={() => navigate('/cart')}>Cart</NavbarItem>}
                <NavbarItem onClick={logout}>Logout</NavbarItem>
            </NavbarItems>
        </NavbarWrapper>
    )
}

export default withRouter(Navbar)