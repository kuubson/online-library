import React from 'react'
import styled from 'styled-components'

const NavbarBrandWrapper = styled.div`
    color: white;
    font-size: 2.5rem;
    font-weight: bold;
    margin-left: 15px;
    white-space: nowrap;
    transition: 0.5s;
    @media (max-width: 1150px) {
        font-size: 2.35rem;
    }
`;

const NavbarBrand = () => {
    return (
        <NavbarBrandWrapper>Online Library</NavbarBrandWrapper>
    )
}

export default NavbarBrand