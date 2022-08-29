import React from 'react'
import styled from 'styled-components'

import hooks from 'hooks'

import Dashboard from './styled/Dashboard'

const WrapperContainer = styled.ImageBackground`
    flex: 1;
`

const Wrapper = ({ children, scene }) => {
    const { shouldPayPalModalAppear } = hooks.usePayPalModal()
    return (
        <WrapperContainer
            source={{
                uri: 'https://picsum.photos/1920/1080'
            }}
        >
            <Dashboard.Layer />
            {scene !== 'Chat' ? (
                <Dashboard.ScrollView
                    contentContainerStyle={{
                        flexGrow: 1
                    }}
                    scrollEnabled={!shouldPayPalModalAppear}
                >
                    {children}
                </Dashboard.ScrollView>
            ) : (
                children
            )}
        </WrapperContainer>
    )
}

export default Wrapper
