import React from 'react'
import styled from 'styled-components'

const NavbarItemsWrapper = styled.div`
    display: flex;
`;

const NavbarItems = ({ children }) => {
    return (
        <NavbarItemsWrapper>{children}</NavbarItemsWrapper>
    )
}

export default NavbarItems