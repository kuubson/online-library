import React from 'react'
import styled from 'styled-components'

const NavbarItemWrapper = styled.div`
    color: white;
    margin: 0px 25px;
    font-size: 1.3rem;
    cursor: pointer;
`;

const NavbarItem = ({ children, onClick }) => {
    return (
        <NavbarItemWrapper onClick={onClick}>{children}</NavbarItemWrapper>
    )
}

export default NavbarItem