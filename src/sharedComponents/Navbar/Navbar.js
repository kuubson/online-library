import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

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

const Navbar = ({ store }) => {
    const dispatch = useDispatch()
    const showBookUploader = () => dispatch({ type: 'setShouldBookUploaderAppear', payload: true })
    return (
        <NavbarWrapper>
            <NavbarBrand />
            {store &&
                <NavbarItems>
                    <NavbarItem>My profile</NavbarItem>
                    <NavbarItem onClick={showBookUploader}>Upload own book</NavbarItem>
                    <NavbarItem>Cart</NavbarItem>
                    <NavbarItem>Logout</NavbarItem>
                </NavbarItems>}
        </NavbarWrapper>
    )
}

export default Navbar