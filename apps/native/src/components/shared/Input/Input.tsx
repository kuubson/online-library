import { upperFirst } from 'lodash'
import { Controller } from 'react-hook-form'
import styled, { css } from 'styled-components/native'

import type { _InputProps } from '@online-library/core'

import { moderateScale } from 'styles'

import * as Styled from './styled'
import { Error } from 'components/shared/styled'

type InputProps = _InputProps & {
   secureTextEntry?: boolean
   moreMarginBottom?: boolean
   noMarginBottom?: boolean
}

export const Input = ({
   control,
   id,
   label,
   placeholder,
   error,
   secureTextEntry,
   moreMarginBottom,
   noMarginBottom,
}: InputProps) => (
   <InputContainer moreMarginBottom={moreMarginBottom} noMarginBottom={noMarginBottom}>
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

type InputContainerProps = Pick<InputProps, 'moreMarginBottom' | 'noMarginBottom'>

const InputContainer = styled.View<InputContainerProps>`
   margin-bottom: ${({ moreMarginBottom }) =>
      moreMarginBottom ? moderateScale(35) : moderateScale(25)}px;
   ${({ noMarginBottom }) =>
      noMarginBottom
         ? css`
              margin-bottom: 0px;
           `
         : null}
`
