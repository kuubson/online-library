import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components/macro'
import axios from 'axios'

import hooks from 'hooks'

import { UserStoreContainer } from 'components/UserStore/UserStore'

import USDashboard from 'components/UserStore/styled/Dashboard'
import Dashboard from './styled/Dashboard'

import Composed from './composed'

import utils from 'utils'

const UserChatContainer = styled(UserStoreContainer)`
    justify-content: flex-start;
`

const UserChat = ({ shouldMenuExpand }) => {
    const { socket } = hooks.useSocket()
    const { setUnreadMessagesAmount } = hooks.useMessages()
    const [currentUserId, setCurrentUserId] = useState()
    const [currentUserNameInitial, setCurrentUserNameInitial] = useState()
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [hasMoreMessages, setHasMoreMessages] = useState(true)
    const [shouldFileInputExist, setShouldFileInputExist] = useState(true)
    const [percentage, setPercentage] = useState(0)
    const messagesRef = useRef()
    const textareaRef = useRef()
    const endOfMessages = useRef()
    const isFileUploading = percentage > 0
    useEffect(() => {
        getMessages(20, 0)
        setTimeout(() => {
            utils.subscribePushNotifications('/api/user/subscribePushNotifications')
            setUnreadMessagesAmount(0)
        }, 0)
    }, [])
    useEffect(() => {
        const handleOnSendMessage = message => {
            setMessages(messages => [...messages, message])
            if (message.type === 'MESSAGE' || message.type === 'FILE') {
                scrollToLastMessage(0)
            }
            socket.emit('readMessages')
        }
        socket && socket.on('sendMessage', handleOnSendMessage)
        return () => socket && socket.off('sendMessage', handleOnSendMessage)
    }, [socket])
    const getMessages = async (limit, offset, e) => {
        const url = '/api/user/getMessages'
        if (e && e.target.scrollTop <= 0 && hasMoreMessages) {
            const response = await utils.apiAxios.post(url, {
                limit,
                offset
            })
            if (response) {
                const { messages: loadedMessages } = response.data
                setHasMoreMessages(loadedMessages.length !== 0)
                const lastScroll = e.target.scrollHeight
                setMessages(messages => [...loadedMessages, ...messages])
                e.target.scrollTop = e.target.scrollHeight - lastScroll
            }
        }
        if (!e) {
            const response = await utils.apiAxios.post(url, {
                limit,
                offset
            })
            if (response) {
                const { messages, userId, nameInitial } = response.data
                setCurrentUserId(userId)
                setCurrentUserNameInitial(nameInitial)
                setMessages(messages)
                pushToLastMessage()
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
    const sendMessage = async () => {
        if (message.trim()) {
            const lastMessage = messages[messages.length - 1]
            const id = lastMessage ? lastMessage.id + 1 : 0
            const _message = {
                id,
                type: 'MESSAGE',
                content: message,
                userId: currentUserId,
                nameInitial: currentUserNameInitial
            }
            setMessages(messages => [...messages, _message])
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
                    socket.emit('sendMessage', _message)
                }
            } catch (error) {
                const conversation = messages
                setMessages(conversation)
                utils.handleApiError(error)
            }
        }
    }
    const sendFile = async e => {
        let intervalId
        let percentage = 0
        const file = e.target.files[0]
        if (file) {
            const path = e.target.value
            const { name, size } = file
            const imageExtensions = /\.(jpg|jpeg|png|gif)$/i
            const videoExtensions = /\.(mp4)$/i
            const fileExtensions = /\.(txt|rtf|doc|docx|xlsx|ppt|pptx|pdf)$/i
            const isImage = imageExtensions.test(path) || imageExtensions.test(name)
            const isVideo = videoExtensions.test(path) || videoExtensions.test(name)
            const isFile = fileExtensions.test(path) || fileExtensions.test(name)
            const resetFileInput = () => {
                setShouldFileInputExist(false)
                setShouldFileInputExist(true)
            }
            const largeSizeError = () => {
                return utils.setFeedbackData(
                    'Sending a file',
                    'You cannot send file with such a large size'
                )
            }
            if (!isImage && !isVideo && !isFile) {
                resetFileInput()
                return utils.setFeedbackData(
                    'Sending a file',
                    'You cannot send file with such an extension'
                )
            }
            if (isImage) {
                if (size > 31457280) {
                    resetFileInput() // 30MB
                    largeSizeError()
                }
            }
            if (isVideo) {
                if (size > 52428800) {
                    resetFileInput() // 50MB
                    largeSizeError()
                }
            }
            if (isFile) {
                if (size > 10485760) {
                    resetFileInput() // 10MB
                    largeSizeError()
                }
            }
            const form = new FormData()
            form.append('file', file)
            try {
                const url = '/api/user/sendFile'
                intervalId = setInterval(() => {
                    if (percentage < 100) {
                        percentage++
                        setPercentage(percentage => percentage + 1)
                    }
                }, 300)
                const response = await axios.post(url, form)
                if (response) {
                    setPercentage(100)
                    clearInterval(intervalId)
                    setTimeout(() => {
                        setPercentage(0)
                    }, 800)
                    const { type, content } = response.data
                    const lastMessage = messages[messages.length - 1]
                    const id = lastMessage ? lastMessage.id + 1 : 0
                    const message = {
                        id,
                        type,
                        content,
                        userId: currentUserId,
                        nameInitial: currentUserNameInitial
                    }
                    setMessages([...messages, message])
                    scrollToLastMessage(0)
                    resetFileInput()
                    socket.emit('sendMessage', message)
                }
            } catch (error) {
                resetFileInput()
                clearInterval(intervalId)
                setPercentage(0)
            }
        }
    }
    return (
        <UserChatContainer shouldMenuExpand={shouldMenuExpand}>
            <Dashboard.ChatContainer>
                <Composed.Messages
                    ref={messagesRef}
                    messages={messages}
                    endOfMessages={endOfMessages}
                    currentUserId={currentUserId}
                    onTouchStart={() =>
                        utils.isMobile() && textareaRef.current && textareaRef.current.blur()
                    }
                    onScroll={e => getMessages(20, messages.length, e)}
                    scrollToLastMessage={scrollToLastMessage}
                />
                <Dashboard.MessageFieldContainer>
                    <Dashboard.MessageField
                        ref={textareaRef}
                        value={message}
                        placeholder="Type your message..."
                        disabled={isFileUploading}
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
                    {isFileUploading ? (
                        <Composed.ProgressLoader percentage={percentage} />
                    ) : (
                        <USDashboard.Button as="label" htmlFor="file" withChat>
                            Upload file
                        </USDashboard.Button>
                    )}
                    {shouldFileInputExist && <Dashboard.FileInput onChange={sendFile} />}
                    <USDashboard.Button
                        onClick={() => {
                            sendMessage()
                            utils.isMobile() && textareaRef.current.focus()
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
