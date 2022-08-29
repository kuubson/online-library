import React, { useEffect, useState } from 'react'
import { AppState } from 'react-native'
import axios from 'axios'
import io from 'socket.io-client'
import PushNotification from 'react-native-push-notification'
import { Actions } from 'react-native-router-flux'

import { API_URL } from '@env'

import hooks from 'hooks'

import Wrapper from 'components/common/Wrapper/Wrapper'
import Loader from 'components/common/Loader/Loader'
import FeedbackHandler from 'components/common/FeedbackHandler/FeedbackHandler'
import Menu from 'components/common/Menu/Menu'

import USComposed from 'components/UserStore/composed'

import utils from 'utils'

const User = ({ scene, children }) => {
    const { socket, setSocket } = hooks.useSocket()
    const { isLoading } = hooks.useLoader()
    const { shouldFeedbackHandlerAppear } = hooks.useFeedbackHandler()
    const {
        lastUnreadMessageIndex,
        unreadMessagesAmount,
        setLastUnreadMessageIndex,
        setUnreadMessagesAmount
    } = hooks.useMessages()
    const { shouldBookPopupAppear, withProfile } = hooks.useBookPopup()
    const [currentUserId, setCurrentUserId] = useState()
    useEffect(() => {
        if (!socket) {
            setSocket(
                io(`${API_URL}/user`, {
                    transports: ['websocket']
                })
            )
        }
        const checkToken = async () => {
            try {
                const url = `${API_URL}/api/global/checkToken`
                const response = await axios.get(url)
                if (response) {
                    const { role } = response.data
                    if (role !== 'user') {
                        Actions.reset('Guest')
                    }
                }
            } catch (error) {
                utils.handleApiError(error)
            }
        }
        const getUnreadMessagesInfo = async () => {
            const url = `${API_URL}/api/user/getUnreadMessagesInfo`
            const response = await utils.apiAxios.get(url)
            if (response) {
                const { lastUnreadMessageIndex, unreadMessagesAmount, userId } = response.data
                setLastUnreadMessageIndex(lastUnreadMessageIndex)
                setUnreadMessagesAmount(unreadMessagesAmount)
                setCurrentUserId(userId)
            }
        }
        checkToken()
        getUnreadMessagesInfo()
    }, [])
    useEffect(() => {
        const handleOnSendMessage = ({ type, content, userId, userName }) => {
            if (AppState.currentState === 'background' && userId !== currentUserId) {
                setUnreadMessagesAmount(unreadMessagesAmount + 1)
                !lastUnreadMessageIndex
                    ? setLastUnreadMessageIndex(1)
                    : setLastUnreadMessageIndex(lastUnreadMessageIndex + 1)
                let message
                switch (true) {
                    case type === 'IMAGE':
                        message = `${userName} has sent a new image`
                        break
                    case type === 'VIDEO':
                        message = `${userName} has sent a new video`
                        break
                    case type === 'FILE':
                        message = `${userName} has sent a new file`
                        break
                    default:
                        message = content
                        break
                }
                PushNotification.localNotification({
                    channelId: 'messages',
                    title: `New message from ${userName}`,
                    message,
                    color: '#0088ff',
                    largeIcon: ''
                })
                PushNotification.localNotification({
                    channelId: 'messages',
                    id: 'messages',
                    group: 'messages',
                    groupSummary: true
                })
            }
        }
        socket && socket.on('sendMessage', handleOnSendMessage)
        return () => socket && socket.off('sendMessage', handleOnSendMessage)
    }, [socket, unreadMessagesAmount, currentUserId])
    return (
        <>
            <Menu scene={scene} />
            {isLoading && <Loader />}
            {shouldFeedbackHandlerAppear && <FeedbackHandler />}
            {shouldBookPopupAppear && !withProfile && <USComposed.BookPopup />}
            <Wrapper scene={scene}>{children}</Wrapper>
        </>
    )
}

export default User
