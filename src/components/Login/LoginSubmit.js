import React from 'react'
import styled from 'styled-components'

const LoginSubmitWrapper = styled.div``;
const LoginSubmitContent = styled.div`
    width: 200px;
    color: white;
    border: 1.5px solid white;
    padding: 10px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    margin-top: 30px;
    cursor: pointer;
    transition: 0.5s;
    :hover{
        transform: scale(1.08)
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
`;

const LoginSubmit = () => {
    return (
        <LoginSubmitWrapper>
            <LoginSubmitContent>Login</LoginSubmitContent>
            <LoginSubmitAnnotation>Feel free to register now!</LoginSubmitAnnotation>
        </LoginSubmitWrapper>
    )
}

export default LoginSubmit