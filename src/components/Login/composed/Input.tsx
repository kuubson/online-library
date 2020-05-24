import React from 'react'
import styled from 'styled-components/macro'

import StyledInput from '../styled/Input'

const InputContainer = styled.div``

const Input: React.FC = () => {
    return (
        <InputContainer>
            <StyledInput.Label></StyledInput.Label>
            <StyledInput.Input />
        </InputContainer>
    )
}

export default Input
