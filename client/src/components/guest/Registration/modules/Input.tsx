import { Controller } from 'react-hook-form'

import styled, { css } from 'styled-components/macro'

import * as Styled from '../styled'

type InputProps = {
   control: any
   id: string
   label?: string
   type: string
   placeholder: string
   error?: string
   withBooksSuggestions?: boolean
}

export const Input = ({
   control,
   id,
   label,
   type,
   placeholder,
   error,
   withBooksSuggestions,
}: InputProps) => (
   <InputContainer withBooksSuggestions={withBooksSuggestions}>
      {label && <Styled.Label htmlFor={id}>{label}</Styled.Label>}
      <Controller
         control={control}
         name={id}
         render={({ field }) => (
            <Styled.Input
               {...field}
               id={id}
               type={type}
               placeholder={placeholder}
               withBooksSuggestions={withBooksSuggestions}
            />
         )}
      />
      {error && <Styled.Error>{error}</Styled.Error>}
   </InputContainer>
)

type InputContainerProps = {
   withBooksSuggestions?: boolean
}

const InputContainer = styled.div<InputContainerProps>`
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
