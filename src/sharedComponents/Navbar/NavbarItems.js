import React from 'react'
import styled, { keyframes, css } from 'styled-components'

const expand = keyframes`
    from{
        max-height: 0px;
    }
    to{
        max-height: 500px;
    }
`;
const shrink = keyframes`
    from{
        max-height: 500px;
    }
    to{
        max-height: 0px;
    }
`;

const NavbarItemsWrapper = styled.div`
    display: flex;
    display: ${props => props.isMobile ? 'none' : 'flex'};
    max-height: ${props => props.shouldNavbarExpand ? '0px' : '500px'};
    @media (max-width: 900px) {
        overflow: hidden;
        display: ${props => props.isMobile ? 'block' : 'none'};
        text-align: center;
        background: linear-gradient(90deg,#4facfe 0,#00f2fe);;
        align-self: stretch;
        margin: 0px 20px;
        transition: ${props => props.shouldNavbarExpand ? '1s ease-in-out' : '0.5s ease-out'};
        max-height: ${props => props.shouldNavbarExpand ? '500px' : '0px'}
    }
`

const NavbarItems = ({ children, isMobile, shouldNavbarExpand }) => {
    return (
        <NavbarItemsWrapper isMobile={isMobile} shouldNavbarExpand={shouldNavbarExpand}>{children}</NavbarItemsWrapper>
    )
}

export default NavbarItems