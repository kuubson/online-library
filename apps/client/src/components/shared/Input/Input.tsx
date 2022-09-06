import { Controller } from 'react-hook-form'
import styled, { css } from 'styled-components/macro'

import { queries } from 'styles'

import * as Styled from './styled'
import { Error } from 'components/shared/styled'

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
      {error && <Error>{error}</Error>}
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
   @media ${queries.desktop} {
      width: 70%;
   }
   ${({ withBooksSuggestions }) =>
      withBooksSuggestions
         ? css`
              @media ${queries.mediumDesktop} {
                 width: 100%;
              }
           `
         : null}
`
