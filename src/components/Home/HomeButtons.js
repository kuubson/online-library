import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

const HomeButtonsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
`;
const HomeButton = styled.div`
    width: 200px;
    background: #333333;
    color: white;
    border-right: 2px solid white;
    border-left: 2px solid white;
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 15px 0px;
    padding: 19px 0px;
    cursor: pointer;
    transition: 0.5s;
    :hover{
        transform: scale(1.08)
    }
    @media (max-width: 900px) {
        font-size: 0.8rem;
    }
    @media (max-width: 700px) {
        width: 180px;
    }
    @media (max-width: 400px) {
        width: 160px;
        padding: 16px 0px;
    }
`;

const HomeButtons = props => {
    const handleClick = where => props.history.push(where)
    return (
        <HomeButtonsWrapper>
            <HomeButton onClick={() => handleClick('/login')}>Login</HomeButton>
            <HomeButton onClick={() => handleClick('/register')}>Register</HomeButton>
        </HomeButtonsWrapper>
    )
}

export default withRouter(HomeButtons)