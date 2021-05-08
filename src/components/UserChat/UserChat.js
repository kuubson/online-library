import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components/macro'

import { UserStoreContainer } from 'components/UserStore/UserStore'

import USDashboard from 'components/UserStore/styled/Dashboard'
import Dashboard from './styled/Dashboard'

import utils from 'utils'

const UserChatContainer = styled(UserStoreContainer)``

const UserChat = ({ shouldMenuExpand }) => {
    const [messages, setMessages] = useState([
        'Message 1',
        'Message 2',
        'Message 3',
        'Message 4',
        'Message 5',
        'Message 6',
        'Message 7',
        'Message 8',
        'Message 9',
        'Message 10',
        'Message 11',
        'Message 12',
        'Message 13',
        'Message 14',
        'Message 15'
    ])
    const [message, setMessage] = useState('')
    const endOfMessages = useRef()
    const scrollToLastMessage = () =>
        setTimeout(
            () =>
                endOfMessages.current.scrollIntoView({
                    behavior: 'smooth'
                }),
            0
        )
    const sendMessage = () => {
        setMessages(messages => [...messages, message])
        setTimeout(() => {
            setMessage('')
        }, 0)
        scrollToLastMessage()
    }
    useEffect(() => {
        scrollToLastMessage()
    }, [])
    return (
        <UserChatContainer shouldMenuExpand={shouldMenuExpand}>
            <Dashboard.ChatContainer>
                {messages.map(message => (
                    <Dashboard.Message>{message}</Dashboard.Message>
                ))}
                <Dashboard.MessageFieldContainer>
                    <Dashboard.MessageField
                        value={message}
                        placeholder="Type your message..."
                        onChange={e => setMessage(e.target.value)}
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
                    <USDashboard.Button withChat>Send</USDashboard.Button>
                </Dashboard.MessageFieldContainer>
                <div ref={endOfMessages}></div>
            </Dashboard.ChatContainer>
        </UserChatContainer>
    )
}

export default UserChat
