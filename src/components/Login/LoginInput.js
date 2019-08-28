import React from 'react'
import styled from 'styled-components'

const LoginInputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 14px 0px;
`;
const LoginLabel = styled.label`
    font-size: 1.05rem;
    font-weight: bold;
    color: white;
    margin-bottom: 5px;
`;
const LoginInputContent = styled.input`
    width: 250px;
    font-size: 0.9rem;
    background: none;
    border: none;
    border-bottom: 2.5px solid white;
    color: white;
    padding: 9px 0px;
    text-indent: 5px;
    ::placeholder{
        color: white;
    }
`;

const LoginInput = ({ secure, placeholder, label }) => {
    return (
        <LoginInputWrapper>
            <LoginLabel>{label}</LoginLabel>
            <LoginInputContent type={secure ? 'password' : 'text'} placeholder={placeholder} />
        </LoginInputWrapper>
    )
}

export default LoginInput