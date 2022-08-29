import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import styled, { css } from 'styled-components'
import RNFetchBlob from 'rn-fetch-blob'

import StyledMessage from '../styled/Message'

import Composed from '.'

import utils from 'utils'

const MessageContainer = styled.TouchableOpacity`
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    align-self: flex-start;
    position: relative;
    ${({ withCurrentUser }) =>
        withCurrentUser &&
        css`
            align-self: flex-end;
        `}
    ${({ withLastUserMessage }) =>
        withLastUserMessage &&
        css`
            margin-bottom: ${utils.scale(20)}px;
        `}
`

const Message = ({
    type,
    content,
    userId,
    userName,
    createdAt,
    currentUserId,
    nextMessage,
    scrollToLastMessage,
    withLastMessage
}) => {
    const [shouldDetailsAppear, setShouldDetailsAppear] = useState(false)
    const [imageError, setImageError] = useState(false)
    const [videoError, setVideoError] = useState(false)
    const date = new Date(createdAt)
    const withCurrentUser = userId === currentUserId
    const withLastUserMessage = (nextMessage && userId !== nextMessage.userId) || !nextMessage
    const withFile = type === 'FILE'
    useEffect(() => scrollToTheBottom(), [])
    useEffect(() => shouldDetailsAppear && setTimeout(() => setShouldDetailsAppear(false), 3000), [
        shouldDetailsAppear
    ])
    const scrollToTheBottom = () => withLastMessage && scrollToLastMessage()
    const downloadFile = () => {
        const { config, fs } = RNFetchBlob
        const { DownloadDir } = fs.dirs
        const options = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path: `${DownloadDir}/${content.split('filename')[1]}`
            }
        }
        config(options).fetch('GET', content)
    }
    const handleFileLoadingError = () =>
        type === 'IMAGE' ? setImageError(true) : setVideoError(true)
    const showError = error => (
        <StyledMessage.ContentContainer
            withCurrentUser={withCurrentUser}
            withLastUserMessage={withLastUserMessage}
        >
            <StyledMessage.Content withLetterSpacing>{error}</StyledMessage.Content>
            {withLastUserMessage && showAvatar()}
        </StyledMessage.ContentContainer>
    )
    const showAvatar = () => (
        <StyledMessage.AvatarContainer withCurrentUser={withCurrentUser}>
            <StyledMessage.Avatar>{userName.charAt(0)}</StyledMessage.Avatar>
        </StyledMessage.AvatarContainer>
    )
    return (
        <MessageContainer
            onPress={() => setShouldDetailsAppear(true)}
            withCurrentUser={withCurrentUser}
            withLastUserMessage={withLastUserMessage && nextMessage}
        >
            {type === 'IMAGE' ? (
                !imageError ? (
                    <StyledMessage.Container>
                        <StyledMessage.Image
                            source={{
                                uri: content
                            }}
                            resizeMode="contain"
                            onLoad={scrollToTheBottom}
                            onError={handleFileLoadingError}
                        />
                        {withLastUserMessage && showAvatar()}
                    </StyledMessage.Container>
                ) : (
                    showError('Image failed to load')
                )
            ) : type === 'VIDEO' ? (
                !videoError ? (
                    <Composed.Video
                        source={{ uri: content }}
                        onLoad={scrollToTheBottom}
                        onError={handleFileLoadingError}
                    />
                ) : (
                    showError('Video failed to load')
                )
            ) : (
                <StyledMessage.ContentContainer
                    as={withFile && TouchableOpacity}
                    onPress={() => withFile && downloadFile()}
                    withCurrentUser={withCurrentUser}
                    withLastUserMessage={withLastUserMessage}
                >
                    <StyledMessage.Content withLetterSpacing={withFile}>
                        {withFile ? content.split('filename')[1] : content}
                    </StyledMessage.Content>
                    {withLastUserMessage && showAvatar()}
                </StyledMessage.ContentContainer>
            )}
            {(withLastUserMessage || shouldDetailsAppear) && (
                <StyledMessage.Date
                    withCurrentUser={withCurrentUser}
                    withLastUserMessage={withLastUserMessage}
                    shouldDetailsAppear={shouldDetailsAppear}
                >
                    {new Date().toDateString() === date.toDateString()
                        ? date.toLocaleTimeString()
                        : date.toLocaleString()}
                </StyledMessage.Date>
            )}
        </MessageContainer>
    )
}

export default Message
