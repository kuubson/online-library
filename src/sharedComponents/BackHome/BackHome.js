import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

const BackHomeWrapper = styled.div`
    color: white;
    font-size: 0.9rem;
    border: 1.5px solid white;
    cursor:pointer;
    padding: 10px 15px;
    position:absolute;
    top: 30px;
    left: 30px;
    transition: 0.5s;
    :hover{
        transform: scale(1.08)
    }
    @media (max-width: 550px) {
        font-size: 0.6rem;
        padding: 8px 12px; 
        top: 15px;
        left: 15px;
    }
    @media (max-width: 500px) {
        display: none;
    }
`;

const BackHome = ({ history }) => {
    const handleClick = () => history.push('/')
    return (
        <BackHomeWrapper onClick={handleClick}>Back home</BackHomeWrapper>
    )
}

export default withRouter(BackHome)