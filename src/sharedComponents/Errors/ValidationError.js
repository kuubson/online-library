import React from 'react'
import styled from 'styled-components'

const ValidationErrorWrapper = styled.div`
    color: red;
    @media (max-width: 600px) {
        font-size: 0.8rem;
    }
`;

const ValidationError = ({ error }) => {
    return (
        <ValidationErrorWrapper>{error}</ValidationErrorWrapper>
    )
}

export default ValidationError