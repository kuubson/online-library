import React from 'react'
import styled from 'styled-components'

import hooks from 'hooks'

import { LoaderContainer } from 'components/common/Loader/Loader'

import HDashboard from 'components/Home/styled/Dashboard'
import ULDashboard from 'components/UserLogin/styled/Dashboard'
import Dashboard from './styled/Dashboard'

const FeedbackHandlerContainer = styled(LoaderContainer)`
    z-index: 3;
`

const FeedbackHandler = () => {
    const { header, message, buttonText, callback, setFeedbackData } = hooks.useFeedbackHandler()
    const handleOnPress = () => {
        callback()
        setFeedbackData()
    }
    return (
        <FeedbackHandlerContainer>
            <Dashboard.ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Dashboard.HeaderContainer>
                    <Dashboard.Header>{header}</Dashboard.Header>
                    <Dashboard.Message>{message}</Dashboard.Message>
                </Dashboard.HeaderContainer>
                <ULDashboard.Button onPress={handleOnPress} noMargin>
                    <HDashboard.ButtonText>{buttonText}</HDashboard.ButtonText>
                </ULDashboard.Button>
            </Dashboard.ScrollView>
        </FeedbackHandlerContainer>
    )
}

export default FeedbackHandler
