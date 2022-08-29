import React from 'react'
import styled from 'styled-components'
import Spinner from 'react-native-spinkit'

import utils from 'utils'

export const LoaderContainer = styled.View`
    background: rgba(0, 0, 0, 0.8);
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    z-index: 2;
`

const Loader = () => {
    return (
        <LoaderContainer>
            <Spinner color="white" type="Circle" size={utils.scale(50)} />
        </LoaderContainer>
    )
}

export default Loader
