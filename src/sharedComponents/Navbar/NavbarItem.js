import React from 'react'
import styled from 'styled-components'

const NavbarItemWrapper = styled.div`
    color: white;
    margin: 0px 25px;
    font-size: 1.3rem;
    cursor: pointer;
    transition: 0.5s;
    @media (max-width: 1150px) {
        font-size: 1.2rem;
    }
    @media (max-width: 900px) {
        margin: 30px 0px;
    }
`;

const NavbarItem = ({ children, onClick }) => {
    return (
        <NavbarItemWrapper onClick={onClick}>{children}</NavbarItemWrapper>
    )
}

export default NavbarItem