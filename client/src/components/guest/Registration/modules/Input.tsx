import React from 'react'
import styled, { css } from 'styled-components'

import * as Styled from '../styled'

type Props = {
    withBooksSuggestions?: boolean
}

const InputContainer = styled.div<Props>`
    width: 550px;
    margin: 0px auto 30px auto;
    :last-of-type {
        margin-bottom: 0px;
    }
    @media (max-width: 1000px) {
        width: 70%;
    }
    ${({ withBooksSuggestions }) =>
        withBooksSuggestions
            ? css`
                  @media (max-width: 1100px) {
                      width: 100%;
                  }
              `
            : null}
`

interface IInput {
    id: string
    label?: string
    type: string
    value: string
    placeholder: string
    error?: string
    onChange: React.ChangeEventHandler<HTMLInputElement>
    withBooksSuggestions?: boolean
}

const Input = ({
    id,
    label,
    type,
    value,
    placeholder,
    error,
    onChange,
    withBooksSuggestions
}: IInput) => {
    return (
        <InputContainer withBooksSuggestions={withBooksSuggestions}>
            {label && <Styled.Label htmlFor={id}>{label}</Styled.Label>}
            <Styled.Input
                id={id}
                name={id}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                withBooksSuggestions={withBooksSuggestions}
            />
            {error && <Styled.Error>{error}</Styled.Error>}
        </InputContainer>
    )
}

export default Input
