import React from 'react'
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
    padding: 20px 15px;
    margin: 20px;
`;

const Navbar = ({ store }) => {
    return (
        <NavbarWrapper>
            <NavbarBrand />
            {store &&
                <NavbarItems>
                    <NavbarItem>My profile</NavbarItem>
                    <NavbarItem>Upload own book</NavbarItem>
                    <NavbarItem>Cart</NavbarItem>
                    <NavbarItem>Logout</NavbarItem>
                </NavbarItems>}
        </NavbarWrapper>
    )
}

export default Navbar