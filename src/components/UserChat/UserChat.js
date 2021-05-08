import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components/macro'
import axios from 'axios'

import { UserStoreContainer } from 'components/UserStore/UserStore'

import USDashboard from 'components/UserStore/styled/Dashboard'
import Dashboard from './styled/Dashboard'

import utils from 'utils'

const UserChatContainer = styled(UserStoreContainer)``

const UserChat = ({ shouldMenuExpand }) => {
    const [currentUserId, setCurrentUserId] = useState()
    const [currentUserNameInitial, setCurrentUserNameInitial] = useState()
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const messagesRef = useRef()
    const textareaRef = useRef()
    const endOfMessages = useRef()
    const scrollToLastMessage = () =>
        setTimeout(
            () =>
                endOfMessages.current.scrollIntoView({
                    behavior: 'smooth'
                }),
            500
        )
    const pushToLastMessage = () =>
        setTimeout(() => (messagesRef.current.scrollTop = messagesRef.current.scrollHeight), 0)
    const sendMessage = async () => {
        if (message.trim()) {
            setMessages(messages => [
                ...messages,
                {
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
                    // socket.emit('sendMessage', {
                    //     content: message,
                    //     userId: currentUserId
                    // })
                }
            } catch (error) {
                const conversation = messages
                setMessages(conversation)
                utils.handleApiError(error)
            }
        }
    }
    useEffect(() => {
        const getMessages = async () => {
            const url = '/api/user/getMessages'
            const response = await utils.apiAxios(url)
            if (response) {
                const { messages, userId, nameInitial } = response.data
                setMessages(messages)
                setCurrentUserId(userId)
                setCurrentUserNameInitial(nameInitial)
                pushToLastMessage()
            }
        }
        getMessages()
    }, [])
    return (
        <UserChatContainer shouldMenuExpand={shouldMenuExpand}>
            <Dashboard.ChatContainer>
                <Dashboard.Messages
                    ref={messagesRef}
                    onTouchStart={() => textareaRef.current && textareaRef.current.blur()}
                >
                    {messages.map(({ content, userId, nameInitial }, index) => {
                        const withCurrentUser = userId === currentUserId
                        const message = messages[index]
                        const nextMessage = messages[index + 1]
                        const withLastUserMessage =
                            (message && nextMessage && message.userId !== nextMessage.userId) ||
                            !nextMessage
                        return (
                            <Dashboard.MessageContainer
                                key={index}
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
                        onFocus={scrollToLastMessage}
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
