import React from 'react'
import styled from 'styled-components'

const ValidationErrorWrapper = styled.div`
    color: red;
`;

const ValidationError = ({ error }) => {
    return (
        <ValidationErrorWrapper>{error}</ValidationErrorWrapper>
    )
}

export default ValidationError