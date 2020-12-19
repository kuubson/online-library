import React from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'

import Dashboard from './styled/Dashboard'

export const LoaderContainer = styled.section`
    width: 100%;
    height: ${() => hooks.useHeight()};
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 5;
`

const Loader = () => {
    return (
        <LoaderContainer>
            <Dashboard.Circle>
                <Dashboard.Dot />
                <Dashboard.Dot />
                <Dashboard.Dot />
                <Dashboard.Dot />
                <Dashboard.Dot />
                <Dashboard.Dot />
            </Dashboard.Circle>
        </LoaderContainer>
    )
}

export default Loader
