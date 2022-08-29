import React, { useEffect } from 'react'
import axios from 'axios'
import { Actions } from 'react-native-router-flux'

import { API_URL } from '@env'

import hooks from 'hooks'

import Wrapper from 'components/common/Wrapper/Wrapper'
import Loader from 'components/common/Loader/Loader'
import FeedbackHandler from 'components/common/FeedbackHandler/FeedbackHandler'

import utils from 'utils'

const Guest = ({ children }) => {
    const { socket, setSocket } = hooks.useSocket()
    const { isLoading } = hooks.useLoader()
    const { shouldFeedbackHandlerAppear } = hooks.useFeedbackHandler()
    useEffect(() => {
        if (socket) {
            socket.disconnect()
            setSocket(undefined)
        }
        const checkToken = async () => {
            try {
                const url = `${API_URL}/api/global/checkToken`
                const response = await axios.get(url)
                if (response) {
                    const { role } = response.data
                    if (role === 'user') {
                        Actions.reset('User')
                    }
                }
            } catch (error) {
                utils.handleApiError(error)
            }
        }
        checkToken()
    }, [])
    return (
        <>
            {isLoading && <Loader />}
            {shouldFeedbackHandlerAppear && <FeedbackHandler />}
            <Wrapper>{children}</Wrapper>
        </>
    )
}

export default Guest
