import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import axios from 'axios'
import io from 'socket.io-client'

import hooks from 'hooks'

import { GuestContainer } from 'components/common/Roles/Guest'

import USComposed from 'components/UserStore/composed'

import utils from 'utils'

const UserContainer = styled(GuestContainer)``

const User = ({ children }) => {
    const { socket, setSocket } = hooks.useSocket()
    const [shouldMenuExpand, _setShouldMenuExpand] = useState(false)
    const { unreadMessagesAmount, setUnreadMessagesAmount } = hooks.useMessages()
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
        const getUnreadMessagesAmount = async () => {
            const url = '/api/user/getUnreadMessagesAmount'
            const response = await utils.apiAxios.get(url)
            if (response) {
                const { unreadMessagesAmount } = response.data
                setUnreadMessagesAmount(unreadMessagesAmount)
            }
        }
        checkToken()
        getUnreadMessagesAmount()
    }, [])
    useEffect(() => {
        const handleOnError = () =>
            utils.setFeedbackData(
                'Connecting to the server',
                `A connection couldn't be established with the server or an unexpected problem occurred on its side`,
                'Refresh the application',
                () => process.env.NODE_ENV === 'production' && window.location.reload()
            )
        const handleOnSendMessage = () => setUnreadMessagesAmount(unreadMessagesAmount + 1)
        if (socket) {
            socket.on('sendMessage', handleOnSendMessage)
            socket.on('connect_error', handleOnError)
        }
        return () => {
            if (socket) {
                socket.off('sendMessage', handleOnSendMessage)
                socket.off('connect_error', handleOnError)
            }
        }
    }, [socket, unreadMessagesAmount])
    const cartItemsAmount = hooks.useCart().cart.length
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
                        counter: cartItemsAmount <= 99 ? cartItemsAmount : 99
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
