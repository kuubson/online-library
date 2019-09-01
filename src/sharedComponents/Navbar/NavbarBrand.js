import React from 'react'
import styled from 'styled-components'

const NavbarBrandWrapper = styled.div`
    color: white;
    font-size: 2.5rem;
    font-weight: bold;
    margin-left: 15px;
`;

const NavbarBrand = () => {
    return (
        <NavbarBrandWrapper>Online Library</NavbarBrandWrapper>
    )
}

export default NavbarBrand