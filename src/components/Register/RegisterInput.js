import React from 'react'
import styled from 'styled-components'

const RegisterInputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 14px 0px;
`;
const RegisterLabel = styled.label`
    font-size: 1.05rem;
    font-weight: bold;
    color: white;
    margin-bottom: 5px;
`;
const RegisterInputContent = styled.input`
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

const RegisterInput = ({ secure, placeholder, label }) => {
    return (
        <RegisterInputWrapper>
            <RegisterLabel>{label}</RegisterLabel>
            <RegisterInputContent type={secure ? 'password' : 'text'} placeholder={placeholder} />
        </RegisterInputWrapper>
    )
}

export default RegisterInput