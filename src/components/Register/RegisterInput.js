import React from 'react'
import styled from 'styled-components'

const RegisterInputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 14px 0px;
    @media (max-width: 450px) {
        margin: 10px 0px;
    }
`;
const RegisterLabel = styled.label`
    font-size: 1.05rem;
    font-weight: bold;
    color: white;
    margin-bottom: 5px;
    @media (max-width: 400px) {
        font-size: 0.85rem;
    }
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
    @media (max-width: 400px) {
        font-size: 0.75rem;
        width: 210px;
        border-bottom: 1.6px solid white;
    }
`;

const RegisterInput = ({ secure, placeholder, label, onChange }) => {
    const handleOnChange = e => onChange(e.target.value)
    return (
        <RegisterInputWrapper>
            <RegisterLabel>{label}</RegisterLabel>
            <RegisterInputContent type={secure ? 'password' : 'text'} placeholder={placeholder} onChange={handleOnChange} />
        </RegisterInputWrapper>
    )
}

export default RegisterInput