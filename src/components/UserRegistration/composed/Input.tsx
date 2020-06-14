import React from 'react'
import styled from 'styled-components'

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
    label: string
    type: 'text' | 'number' | 'password'
    value: string | number
    placeholder: string
    error: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<IInput> = ({ id, label, type, value, placeholder, error, onChange }) => {
    return (
        <InputContainer>
            <Dashboard.Label htmlFor={id}>{label}</Dashboard.Label>
            <Dashboard.Input
                id={id}
                name={id}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
            {error && <Dashboard.Error>{error}</Dashboard.Error>}
        </InputContainer>
    )
}

export default Input
