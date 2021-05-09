import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components/macro'
import axios from 'axios'

import hooks from 'hooks'

import { UserStoreContainer } from 'components/UserStore/UserStore'

import USDashboard from 'components/UserStore/styled/Dashboard'
import Dashboard from './styled/Dashboard'

import utils from 'utils'

const UserChatContainer = styled(UserStoreContainer)``

const UserChat = ({ shouldMenuExpand }) => {
    const { socket } = hooks.useSocket()
    const { setUnreadMessagesAmount } = hooks.useMessages()
    const [currentUserId, setCurrentUserId] = useState()
    const [currentUserNameInitial, setCurrentUserNameInitial] = useState()
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [hasMoreMessages, setHasMoreMessages] = useState(true)
    const messagesRef = useRef()
    const textareaRef = useRef()
    const endOfMessages = useRef()
    useEffect(() => {
        getMessages(20, 0)
        utils.subscribePushNotifications('/api/user/subscribePushNotifications')
        setTimeout(() => {
            setUnreadMessagesAmount(0)
        }, 0)
    }, [])
    useEffect(() => {
        const handleOnSendMessage = ({ id, content, userId, nameInitial }) => {
            setMessages(messages => [
                ...messages,
                {
                    id,
                    content,
                    userId,
                    nameInitial
                }
            ])
            scrollToLastMessage(0)
            socket.emit('readMessages')
        }
        socket && socket.on('sendMessage', handleOnSendMessage)
        return () => socket && socket.off('sendMessage', handleOnSendMessage)
    }, [socket])
    const getMessages = async (limit, offset, event) => {
        const url = '/api/user/getMessages'
        if (event && event.target.scrollTop <= 0 && hasMoreMessages) {
            const response = await utils.apiAxios.post(url, {
                limit,
                offset
            })
            if (response) {
                const { messages: loadedMessages } = response.data
                setHasMoreMessages(loadedMessages.length !== 0)
                const lastScroll = event.target.scrollHeight
                setMessages(messages => [...loadedMessages, ...messages])
                event.target.scrollTop = event.target.scrollHeight - lastScroll
            }
        }
        if (!event) {
            const response = await utils.apiAxios.post(url, {
                limit,
                offset
            })
            if (response) {
                const { messages, userId, nameInitial } = response.data
                setMessages(messages)
                setCurrentUserId(userId)
                setCurrentUserNameInitial(nameInitial)
                pushToLastMessage()
            }
        }
    }
    const sendMessage = async () => {
        if (message.trim()) {
            const lastMessage = messages[messages.length - 1]
            const id = lastMessage ? lastMessage.id + 1 : 0
            setMessages(messages => [
                ...messages,
                {
                    id,
                    content: message,
                    userId: currentUserId,
                    nameInitial: currentUserNameInitial
                }
            ])
            pushToLastMessage()
            setTimeout(() => {
                setMessage('')
            }, 0)
            try {
                const url = '/api/user/sendMessage'
                const response = await axios.post(url, {
                    content: message
                })
                if (response) {
                    socket.emit('sendMessage', {
                        id,
                        content: message,
                        userId: currentUserId,
                        nameInitial: currentUserNameInitial
                    })
                }
            } catch (error) {
                const conversation = messages
                setMessages(conversation)
                utils.handleApiError(error)
            }
        }
    }
    const scrollToLastMessage = delay =>
        setTimeout(
            () =>
                endOfMessages.current.scrollIntoView({
                    behavior: 'smooth'
                }),
            delay
        )
    const pushToLastMessage = () =>
        setTimeout(() => (messagesRef.current.scrollTop = messagesRef.current.scrollHeight), 0)
    return (
        <UserChatContainer shouldMenuExpand={shouldMenuExpand}>
            <Dashboard.ChatContainer>
                <Dashboard.Messages
                    ref={messagesRef}
                    onTouchStart={() => textareaRef.current && textareaRef.current.blur()}
                    onScroll={e => getMessages(20, messages.length, e)}
                >
                    {messages.map(({ id, content, userId, nameInitial }, index) => {
                        const withCurrentUser = userId === currentUserId
                        const message = messages[index]
                        const nextMessage = messages[index + 1]
                        const withLastUserMessage =
                            (message && nextMessage && message.userId !== nextMessage.userId) ||
                            !nextMessage
                        return (
                            <Dashboard.MessageContainer
                                key={id}
                                withCurrentUser={withCurrentUser}
                                withLastUserMessage={withLastUserMessage && nextMessage}
                            >
                                <Dashboard.Message
                                    withCurrentUser={withCurrentUser}
                                    withLastUserMessage={withLastUserMessage}
                                    withLastMessage={index === messages.length - 1}
                                >
                                    {content}
                                    {withLastUserMessage && (
                                        <Dashboard.Avatar withCurrentUser={withCurrentUser}>
                                            {nameInitial}
                                        </Dashboard.Avatar>
                                    )}
                                </Dashboard.Message>
                            </Dashboard.MessageContainer>
                        )
                    })}
                    <div ref={endOfMessages}></div>
                </Dashboard.Messages>
                <Dashboard.MessageFieldContainer>
                    <Dashboard.MessageField
                        ref={textareaRef}
                        value={message}
                        placeholder="Type your message..."
                        onChange={e => setMessage(e.target.value)}
                        onFocus={() => scrollToLastMessage(500)}
                        onKeyPress={e => {
                            if (e.key === 'Enter') {
                                switch (true) {
                                    case utils.isMobile():
                                        return
                                    case !e.target.value.trim():
                                        e.preventDefault()
                                        break
                                    case !e.shiftKey:
                                        sendMessage()
                                        break
                                }
                            }
                        }}
                    />
                    <USDashboard.Button withChat>Upload file</USDashboard.Button>
                    <USDashboard.Button
                        onClick={() => {
                            sendMessage()
                            textareaRef.current.focus()
                        }}
                        withChat
                    >
                        Send
                    </USDashboard.Button>
                </Dashboard.MessageFieldContainer>
            </Dashboard.ChatContainer>
        </UserChatContainer>
    )
}

export default UserChat
