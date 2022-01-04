import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import io from 'socket.io-client'

import { GuestContainer } from 'components/shared/roles/Guest'

import Menu from 'components/user/Store/modules/Menu'

import { useSocket, useCart, useMessagesInfo } from 'hooks'

import { handleApiError } from 'helpers'

import { history } from 'utils'

const UserContainer = styled(GuestContainer)`
    height: auto;
    min-height: 100%;
`

interface IUser {
    withChat?: boolean
}

export const User: React.FC<IUser> = ({ children, withChat }) => {
    const { socket, setSocket } = useSocket()
    const {
        lastUnreadMessageIndex,
        unreadMessagesAmount,
        setLastUnreadMessageIndex,
        setUnreadMessagesAmount
    } = useMessagesInfo()
    const { cart } = useCart()
    const [shouldMenuExpand, _setShouldMenuExpand] = useState(false)
    const [currentUserId, setCurrentUserId] = useState()
    useEffect(() => {
        if (!socket) {
            setSocket(
                io('/user', {
                    withCredentials: true
                })
            )
        }
        const checkToken = async () => {
            try {
                const url = '/api/global/auth/checkToken'
                const response = await axios.get(url)
                if (response) {
                    const { role } = response.data
                    if (role !== 'user') {
                        history.push('/login')
                    }
                }
            } catch (error) {
                handleApiError(error)
            }
        }
        const getMessagesInfo = async () => {
            const url = '/api/user/chat/getMessagesInfo'
            const response = await axios.get(url)
            if (response) {
                const { lastUnreadMessageIndex, unreadMessagesAmount, userId } = response.data
                setLastUnreadMessageIndex(lastUnreadMessageIndex)
                setUnreadMessagesAmount(unreadMessagesAmount)
                setCurrentUserId(userId)
            }
        }
        checkToken()
        getMessagesInfo()
    }, [])
    useEffect(() => {
        const handleOnSendMessage = ({ userId }: { userId: number }) => {
            if (!withChat && userId !== currentUserId) {
                setUnreadMessagesAmount(unreadMessagesAmount + 1)
                !lastUnreadMessageIndex
                    ? setLastUnreadMessageIndex(1)
                    : setLastUnreadMessageIndex(lastUnreadMessageIndex + 1)
            }
        }
        if (socket) {
            socket.on('sendMessage', handleOnSendMessage)
        }
        return () => {
            if (socket) {
                socket.off('sendMessage', handleOnSendMessage)
            }
        }
    }, [socket, unreadMessagesAmount, currentUserId])
    return (
        <>
            <Menu
                options={[
                    {
                        option: 'Store',
                        pathname: '/store'
                    },
                    {
                        option: 'Profile',
                        pathname: '/profile'
                    },
                    {
                        option: 'Cart',
                        pathname: '/cart',
                        counter: cart.length <= 99 ? cart.length : 99
                    },
                    {
                        option: 'Chat',
                        pathname: '/chat',
                        counter: unreadMessagesAmount <= 99 ? unreadMessagesAmount : 99
                    },
                    {
                        option: 'Logout'
                    }
                ]}
                _setShouldMenuExpand={_setShouldMenuExpand}
            />
            <UserContainer>
                {React.cloneElement(children as any, {
                    shouldMenuExpand
                })}
            </UserContainer>
        </>
    )
}
