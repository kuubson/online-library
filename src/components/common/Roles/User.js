import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import axios from 'axios'
import io from 'socket.io-client'

import hooks from 'hooks'

import { GuestContainer } from 'components/common/Roles/Guest'

import USComposed from 'components/UserStore/composed'

import utils from 'utils'

const UserContainer = styled(GuestContainer)``

const User = ({ children, withChat }) => {
    const { socket, setSocket } = hooks.useSocket()
    const { unreadMessagesAmount, setUnreadMessagesAmount, setLastUnreadMessageIndex } =
        hooks.useMessages()
    const { cart } = hooks.useCart()
    const [shouldMenuExpand, _setShouldMenuExpand] = useState(false)
    const [currentUserId, setCurrentUserId] = useState()
    useEffect(() => {
        if (!socket) {
            setTimeout(() => {
                setSocket(io('/user'))
            }, 0)
        }
        const checkToken = async () => {
            try {
                const url = '/api/global/checkToken'
                const response = await axios.get(url)
                if (response) {
                    const { role } = response.data
                    if (role !== 'user') {
                        utils.redirectTo('/user/login')
                    }
                }
            } catch (error) {
                utils.handleApiError(error)
            }
        }
        const getUnreadMessagesInfo = async () => {
            const url = '/api/user/getUnreadMessagesInfo'
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
        const handleOnSendMessage = ({ userId }) =>
            !withChat &&
            userId !== currentUserId &&
            setUnreadMessagesAmount(unreadMessagesAmount + 1)
        socket && socket.on('sendMessage', handleOnSendMessage)
        return () => socket && socket.off('sendMessage', handleOnSendMessage)
    }, [socket, unreadMessagesAmount, currentUserId])
    return (
        <>
            <USComposed.Menu
                options={[
                    {
                        option: 'Store',
                        pathname: '/user/store'
                    },
                    {
                        option: 'Profile',
                        pathname: '/user/profile'
                    },
                    {
                        option: 'Cart',
                        pathname: '/user/cart',
                        counter: cart.length <= 99 ? cart.length : 99
                    },
                    {
                        option: 'Chat',
                        pathname: '/user/chat',
                        counter: unreadMessagesAmount <= 99 ? unreadMessagesAmount : 99
                    },
                    {
                        option: 'Logout'
                    }
                ]}
                _setShouldMenuExpand={_setShouldMenuExpand}
            />
            <UserContainer>
                {React.cloneElement(children, {
                    shouldMenuExpand
                })}
            </UserContainer>
        </>
    )
}

export default User
