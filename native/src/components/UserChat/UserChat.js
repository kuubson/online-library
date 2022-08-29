import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import DocumentPicker from 'react-native-document-picker'
import Spinner from 'react-native-spinkit'

import { API_URL } from '@env'

import hooks from 'hooks'

import { UserStoreContainer } from 'components/UserStore/UserStore'

import USDashboard from 'components/UserStore/styled/Dashboard'
import Dashboard from './styled/Dashboard'

import Composed from './composed'

import utils from 'utils'

const UserChatContainer = styled(UserStoreContainer)`
    padding-top: ${utils.scale(10)}px;
    padding-bottom: ${utils.scale(15)}px;
`

const UserChat = () => {
    const { socket } = hooks.useSocket()
    const { lastUnreadMessageIndex, setUnreadMessagesAmount } = hooks.useMessages()
    const messagesRef = useRef()
    const endOfMessages = useRef()
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingMoreMessages, setIsLoadingMoreMessages] = useState(false)
    const [isFileUploading, setIsFileUploading] = useState(false)
    const [canScrollAfterLoadingMoreMessages, setCanScrollAfterLoadingMoreMessages] = useState(
        false
    )
    const [currentUserId, setCurrentUserId] = useState()
    const [currentUserName, setCurrentUserName] = useState()
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [hasMoreMessages, setHasMoreMessages] = useState(true)
    const [lastScroll, setLastScroll] = useState()
    const areThereMessages = messages.length > 0
    useEffect(() => getMessages(20, 0), [])
    useEffect(() => {
        const handleOnSendMessage = message => {
            setMessages(messages => [...messages, message])
            scrollToLastMessage()
            socket.emit('readMessages')
        }
        socket && socket.on('sendMessage', handleOnSendMessage)
        return () => socket && socket.off('sendMessage', handleOnSendMessage)
    }, [socket])
    const getMessages = async (limit, offset, e) => {
        const url = `${API_URL}/api/user/getMessages`
        if (!isLoadingMoreMessages && e && e.nativeEvent.contentOffset.y <= 0 && hasMoreMessages) {
            try {
                e.persist()
                utils.setIsLoading(true)
                setIsLoadingMoreMessages(true)
                const response = await axios.post(url, {
                    limit,
                    offset
                })
                if (response) {
                    const { messages: loadedMessages } = response.data
                    const hasMoreMessages = loadedMessages.length !== 0
                    setHasMoreMessages(loadedMessages.length !== 0)
                    setMessages(messages => [...loadedMessages, ...messages])
                    setIsLoadingMoreMessages(false)
                    hasMoreMessages && setCanScrollAfterLoadingMoreMessages(true)
                    if (!hasMoreMessages) {
                        utils.setIsLoading(false)
                    }
                    if (loadedMessages.length + messages.length >= lastUnreadMessageIndex) {
                        setUnreadMessagesAmount(0)
                    }
                }
            } catch (error) {
                utils.handleApiError(error)
            }
        }
        if (!e) {
            const response = await utils.apiAxios.post(url, {
                limit,
                offset
            })
            if (response) {
                setIsLoading(false)
                const { messages, userId, userName } = response.data
                setCurrentUserId(userId)
                setCurrentUserName(userName)
                setMessages(messages)
                scrollToLastMessage()
                if (messages.length >= lastUnreadMessageIndex) {
                    setUnreadMessagesAmount(0)
                }
            }
        }
    }
    const getUnreadMessages = async () => {
        const url = `${API_URL}/api/user/getMessages`
        const response = await utils.apiAxios.post(url, {
            limit: lastUnreadMessageIndex,
            offset: 0
        })
        if (response) {
            const { messages } = response.data
            setMessages(messages)
            messagesRef.current.scrollTo({
                x: 0,
                y: 0,
                animated: false
            })
            setUnreadMessagesAmount(0)
        }
    }
    const sendMessage = async () => {
        if (message.trim()) {
            const lastMessage = messages[messages.length - 1]
            const id = lastMessage ? lastMessage.id + 1 : 0
            const _message = {
                id,
                type: 'MESSAGE',
                content: message,
                userId: currentUserId,
                userName: currentUserName,
                createdAt: new Date()
            }
            setMessages(messages => [...messages, _message])
            scrollToLastMessage()
            setMessage('')
            try {
                const url = `${API_URL}/api/user/sendMessage`
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
    const sendFile = async () => {
        setIsFileUploading(true)
        const file = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles]
        })
        const { name, size } = file
        const imageExtensions = /\.(jpg|jpeg|png|gif)$/i
        const videoExtensions = /\.(mp4)$/i
        const fileExtensions = /\.(txt|rtf|doc|docx|xlsx|ppt|pptx|pdf)$/i
        const isImage = imageExtensions.test(name)
        const isVideo = videoExtensions.test(name)
        const isFile = fileExtensions.test(name)
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
                largeSizeError()
            }
        }
        if (isVideo) {
            if (size > 52428800) {
                largeSizeError()
            }
        }
        if (isFile) {
            if (size > 10485760) {
                largeSizeError()
            }
        }
        const form = new FormData()
        form.append('file', file)
        try {
            const url = `${API_URL}/api/user/sendFile`
            const response = await axios.post(url, form)
            if (response) {
                setIsFileUploading(false)
                const { type, content } = response.data
                const lastMessage = messages[messages.length - 1]
                const id = lastMessage ? lastMessage.id + 1 : 0
                const message = {
                    id,
                    type,
                    content,
                    userId: currentUserId,
                    userName: currentUserName,
                    createdAt: new Date()
                }
                setMessages([...messages, message])
                scrollToLastMessage()
                socket.emit('sendMessage', message)
            }
        } catch (error) {
            utils.setFeedbackData(
                'Sending a file',
                'There was an unexpected problem when sending the file'
            )
        }
    }
    const scrollToLastMessage = () =>
        messagesRef.current.scrollToEnd({
            animated: true
        })
    const handleOnContentSizeChange = (_, h) => {
        if (!lastScroll || lastScroll !== h) {
            setLastScroll(h)
        }
        if (canScrollAfterLoadingMoreMessages) {
            messagesRef.current.scrollTo({
                x: 0,
                y: h - lastScroll,
                animated: false
            })
            utils.setIsLoading(false)
            setLastScroll(h)
            setCanScrollAfterLoadingMoreMessages(false)
        }
    }
    return (
        <>
            <UserChatContainer>
                {!isLoading && lastUnreadMessageIndex && messages.length < lastUnreadMessageIndex && (
                    <Dashboard.MessagesInfo onPress={getUnreadMessages}>
                        <Dashboard.MessagesInfoText>Unread messages</Dashboard.MessagesInfoText>
                    </Dashboard.MessagesInfo>
                )}
                {!isLoading &&
                    (areThereMessages ? (
                        <Composed.Messages
                            ref={messagesRef}
                            endOfMessages={endOfMessages}
                            messages={messages}
                            currentUserId={currentUserId}
                            onScroll={e => getMessages(20, messages.length, e)}
                            onContentSizeChange={handleOnContentSizeChange}
                            scrollToLastMessage={scrollToLastMessage}
                        />
                    ) : (
                        <USDashboard.Warning>There are no messages</USDashboard.Warning>
                    ))}
            </UserChatContainer>
            <Dashboard.TextareaContainer>
                <Dashboard.Textarea
                    ref={ref => ref && ref.setNativeProps({ style: { fontFamily: 'IndieFlower' } })}
                    value={message}
                    placeholder="Type your message..."
                    placeholderTextColor="white"
                    onChangeText={setMessage}
                    textAlignVertical="top"
                    multiline={true}
                />
                <Dashboard.ButtonsContainer>
                    <Dashboard.ButtonContainer withMarginRight>
                        {!isFileUploading ? (
                            <Dashboard.Button onPress={sendFile}>
                                <Dashboard.ButtonText>Upload file</Dashboard.ButtonText>
                            </Dashboard.Button>
                        ) : (
                            <Spinner color="white" type="Bounce" size={utils.scale(50)} />
                        )}
                    </Dashboard.ButtonContainer>
                    <Dashboard.ButtonContainer>
                        <Dashboard.Button onPress={sendMessage}>
                            <Dashboard.ButtonText>Send</Dashboard.ButtonText>
                        </Dashboard.Button>
                    </Dashboard.ButtonContainer>
                </Dashboard.ButtonsContainer>
            </Dashboard.TextareaContainer>
        </>
    )
}

export default UserChat
