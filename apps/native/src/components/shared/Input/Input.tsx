import { upperFirst } from 'lodash'
import type { Control } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import styled from 'styled-components/native'

import type { AnyControl } from '@online-library/core'

import { scale } from 'styles'

import * as Styled from './styled'
import { Error } from 'components/shared/styled'

type InputProps = {
   control: Control<AnyControl, AnyControl>
   id: string
   label?: string
   type: string
   placeholder: string
   error?: string
   secureTextEntry?: boolean
   moreMarginBottom?: boolean
}

export const Input = ({
   control,
   id,
   label,
   placeholder,
   error,
   secureTextEntry,
   moreMarginBottom,
}: InputProps) => (
   <InputContainer moreMarginBottom={moreMarginBottom}>
      {!!label && <Styled.Label>{label}</Styled.Label>}
      <Controller
         control={control}
         name={id}
         render={({ field }) => (
            <Styled.Input
               value={field.value}
               onChangeText={field.onChange}
               placeholder={placeholder}
               secureTextEntry={secureTextEntry}
               placeholderTextColor="white"
            />
         )}
      />
      {error && <Error>{upperFirst(error)}</Error>}
   </InputContainer>
)

type InputContainerProps = Pick<InputProps, 'moreMarginBottom'>

const InputContainer = styled.View<InputContainerProps>`
   margin-bottom: ${({ moreMarginBottom }) => (moreMarginBottom ? scale(35) : scale(25))}px;
`
