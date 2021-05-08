import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components/macro'

import { UserStoreContainer } from 'components/UserStore/UserStore'

import USDashboard from 'components/UserStore/styled/Dashboard'
import Dashboard from './styled/Dashboard'

import utils from 'utils'

const UserChatContainer = styled(UserStoreContainer)``

const UserChat = ({ shouldMenuExpand }) => {
    const [currentUserId, setCurrentUserId] = useState(1)
    const [messages, setMessages] = useState([
        {
            content: 'Message 1',
            userId: 1
        },
        {
            content: 'Message 2',
            userId: 2
        },
        {
            content: 'Message 3',
            userId: 1
        },
        {
            content: 'Message 4',
            userId: 2
        },
        {
            content: 'Message 5',
            userId: 1
        },
        {
            content: 'Message 6',
            userId: 2
        },
        {
            content: 'Message 7',
            userId: 2
        },
        {
            content: 'Message 8',
            userId: 2
        },
        {
            content: 'Message 9',
            userId: 1
        },
        {
            content: 'Message 10',
            userId: 1
        },
        {
            content: 'Message 11',
            userId: 2
        },
        {
            content: 'Message 12',
            userId: 2
        },
        {
            content: 'Message 13',
            userId: 1
        },
        {
            content: 'Message 14',
            userId: 2
        },
        {
            content: 'Message 15',
            userId: 2
        }
    ])
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
    const sendMessage = () => {
        if (message.trim()) {
            setMessages(messages => [
                ...messages,
                {
                    content: message,
                    userId: currentUserId
                }
            ])
            pushToLastMessage()
            setTimeout(() => {
                setMessage('')
            }, 0)
        }
    }
    useEffect(pushToLastMessage, [])
    return (
        <UserChatContainer shouldMenuExpand={shouldMenuExpand}>
            <Dashboard.ChatContainer>
                <Dashboard.Messages
                    ref={messagesRef}
                    onTouchStart={() => textareaRef.current && textareaRef.current.blur()}
                >
                    {messages.map(({ content, userId }, index) => {
                        const withCurrentUser = userId === currentUserId
                        const withLastUserMessage =
                            (messages[index] &&
                                messages[index + 1] &&
                                messages[index].userId !== messages[index + 1].userId) ||
                            !messages[index + 1]
                        return (
                            <Dashboard.MessageContainer
                                key={index}
                                withCurrentUser={withCurrentUser}
                                withLastUserMessage={withLastUserMessage && messages[index + 1]}
                            >
                                <Dashboard.Message
                                    withCurrentUser={withCurrentUser}
                                    withLastUserMessage={withLastUserMessage}
                                    withLastMessage={index === messages.length - 1}
                                >
                                    {content}
                                    {withLastUserMessage && (
                                        <Dashboard.Avatar withCurrentUser={withCurrentUser}>
                                            T
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
