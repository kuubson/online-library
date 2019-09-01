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
`;

const BackHome = ({ history }) => {
    const handleClick = () => history.push('/')
    return (
        <BackHomeWrapper onClick={handleClick}>Back home</BackHomeWrapper>
    )
}

export default withRouter(BackHome)