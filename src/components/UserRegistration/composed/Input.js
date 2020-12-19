import React from 'react'
import styled, { css } from 'styled-components/macro'

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
    ${({ withBooksSuggestions }) =>
        withBooksSuggestions &&
        css`
            @media (max-width: 1100px) {
                width: 100%;
            }
        `}
`

const Input = ({ id, label, type, value, placeholder, error, onChange, withBooksSuggestions }) => {
    return (
        <InputContainer withBooksSuggestions={withBooksSuggestions}>
            {label && <Dashboard.Label htmlFor={id}>{label}</Dashboard.Label>}
            <Dashboard.Input
                id={id}
                name={id}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                withBooksSuggestions={withBooksSuggestions}
            />
            {error && <Dashboard.Error>{error}</Dashboard.Error>}
        </InputContainer>
    )
}

export default Input
