import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

const LoginSubmitWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const LoginSubmitContent = styled.div`
    width: 200px;
    color: white;
    border: 1.5px solid white;
    padding: 10px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.95rem;
    margin-top: 30px;
    cursor: pointer;
    transition: 0.5s;
    :hover{
        transform: scale(1.08)
    }
    @media (max-width: 400px) {
        font-size: 0.75rem;
    }
`;
const LoginSubmitAnnotation = styled.div`
    color: white;
    text-align: center;
    margin-top: 20px;
    cursor: pointer;
    transition: 0.5s;
    :hover{
        transform: scale(1.03)
    }
    @media (max-width: 400px) {
        font-size: 0.70rem;
    }
`;

const LoginSubmit = props => {
    const handleClick = where => props.history.push(where)
    return (
        <LoginSubmitWrapper>
            <LoginSubmitContent onClick={props.onClick}>Login</LoginSubmitContent>
            <LoginSubmitAnnotation onClick={() => handleClick('/register')}>Feel free to register now!</LoginSubmitAnnotation>
        </LoginSubmitWrapper>
    )
}

export default withRouter(LoginSubmit)