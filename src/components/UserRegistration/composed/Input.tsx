import React from 'react'
import styled from 'styled-components/macro'

import Dashboard from '../styled/Dashboard'

const InputContainer = styled.div`
    width: 550px;
    margin: 0px auto 30px auto;
    :last-of-type {
        margin-bottom: 0px;
    }
    @media (max-width: 1000px) {
        width: 70%;
    }
`

interface IInput {
    id: string
    type: 'text' | 'number' | 'password'
    label: string
    placeholder: string
    error: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<IInput> = ({ id, type, label, placeholder, error, onChange }) => {
    return (
        <InputContainer>
            <Dashboard.Label htmlFor={id}>{label}</Dashboard.Label>
            <Dashboard.Input
                id={id}
                name={id}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
            />
            {error && <Dashboard.Error>{error}</Dashboard.Error>}
        </InputContainer>
    )
}

export default Input
