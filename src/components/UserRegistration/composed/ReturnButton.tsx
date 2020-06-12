import React from 'react'
import styled from 'styled-components'

import utils from '~utils'

const ReturnButtonContainer = styled.button`
    height: 38px;
    font-size: 13px;
    font-weight: bold;
    border: 1.5px solid white;
    padding: 0px 30px;
    position: absolute;
    top: 20px;
    left: 20px;
    @media (max-width: 1250px) {
        font-size: 12px;
    }
    @media (max-width: 1000px) {
        font-size: 11px;
        padding: 0px 25px;
    }
    @media (max-width: 500px) {
        font-size: 10px;
        padding: 0px 22px;
    }
`

const ReturnButton: React.FC = () => {
    return <ReturnButtonContainer onClick={utils.goBack}>Powrót</ReturnButtonContainer>
}

export default ReturnButton
