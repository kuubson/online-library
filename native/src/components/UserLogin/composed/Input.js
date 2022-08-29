import React from 'react'
import styled from 'styled-components'

import Dashboard from '../styled/Dashboard'

import utils from 'utils'

const InputContainer = styled.View`
    margin-bottom: ${({ moreMarginBottom }) =>
        moreMarginBottom ? utils.scale(35) : utils.scale(25)}px;
`

const Input = ({
    label,
    value,
    placeholder,
    error,
    onChangeText,
    secureTextEntry,
    moreMarginBottom
}) => {
    return (
        <InputContainer moreMarginBottom={moreMarginBottom}>
            {!!label && <Dashboard.Label>{label}</Dashboard.Label>}
            <Dashboard.Input
                ref={ref => ref && ref.setNativeProps({ style: { fontFamily: 'IndieFlower' } })}
                value={value}
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                placeholderTextColor="white"
                onChangeText={onChangeText}
            />
            {!!error && <Dashboard.Error>{error}</Dashboard.Error>}
        </InputContainer>
    )
}

export default Input
