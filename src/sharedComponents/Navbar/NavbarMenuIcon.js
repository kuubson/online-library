import React from 'react'
import styled from 'styled-components'

const NavbarMenuIconWrapper = styled.div`
    font-size: 1.4rem;
    margin-right: 5px;
    margin-top: 2px;
    display: none;
    cursor: pointer;
    position:absolute;
    top: 50%;
    right: 15px;
    transform: translate(0px, -50%);
    @media (max-width: 900px) {
        display: block;  
    }
`;

const NavbarMenuIcon = ({ onClick }) => {
    return (
        <NavbarMenuIconWrapper onClick={onClick} className="icon-menu"></NavbarMenuIconWrapper>
    )
}

export default NavbarMenuIcon