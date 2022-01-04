import { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import fileSaver from 'file-saver'

import * as Styled from './styled'

type Props = {
    withCurrentUser?: boolean
    withLastUserMessage?: boolean
}

const MessageContainer = styled.div<Props>`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    align-self: flex-start;
    cursor: pointer;
    position: relative;
    ${({ withCurrentUser }) =>
        withCurrentUser
            ? css`
                  align-self: flex-end;
              `
            : null}
    ${({ withLastUserMessage }) =>
        withLastUserMessage
            ? css`
                  margin-bottom: 20px;
              `
            : null}
`

type MessageProps = {
    currentUserId: string | undefined
    nextMessage: IMessage
    scrollToLastMessage: (delay: number) => void
    withLastMessage: boolean
}

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
}: IMessage & MessageProps) => {
    const [shouldDetailsAppear, setShouldDetailsAppear] = useState(false)
    const [imageError, setImageError] = useState(false)
    const [videoError, setVideoError] = useState(false)
    const date = new Date(createdAt)
    const withCurrentUser = userId === currentUserId
    const withLastUserMessage = (nextMessage && userId !== nextMessage.userId) || !nextMessage
    const withFile = type === 'FILE'
    useEffect(() => {
        scrollToTheBottom()
    }, [])
    useEffect(() => {
        shouldDetailsAppear && setTimeout(() => setShouldDetailsAppear(false), 3000)
    }, [shouldDetailsAppear])
    const scrollToTheBottom = () => withLastMessage && scrollToLastMessage(0)
    const handleFileLoadingError = () =>
        type === 'IMAGE' ? setImageError(true) : setVideoError(true)
    const showError = (error: string) => (
        <Styled.Content
            withCurrentUser={withCurrentUser}
            withLastUserMessage={withLastUserMessage}
            withError
        >
            {error}
            {withLastUserMessage && showAvatar()}
        </Styled.Content>
    )
    const showAvatar = () => (
        <Styled.Avatar withCurrentUser={withCurrentUser}>{userName!.charAt(0)}</Styled.Avatar>
    )
    return (
        <MessageContainer
            onClick={() => setShouldDetailsAppear(true)}
            withCurrentUser={withCurrentUser}
            withLastUserMessage={!!withLastUserMessage && !!nextMessage}
        >
            {type === 'IMAGE' ? (
                !imageError ? (
                    <Styled.Container>
                        <Styled.Image
                            src={content}
                            onLoad={scrollToTheBottom}
                            onError={handleFileLoadingError}
                        />
                        {withLastUserMessage && showAvatar()}
                    </Styled.Container>
                ) : (
                    showError('Image failed to load')
                )
            ) : type === 'VIDEO' ? (
                !videoError ? (
                    <Styled.Container>
                        <Styled.Video
                            src={content}
                            controls
                            onLoadStart={scrollToTheBottom}
                            onError={handleFileLoadingError}
                        />
                        {withLastUserMessage && showAvatar()}
                    </Styled.Container>
                ) : (
                    showError('Video failed to load')
                )
            ) : (
                <Styled.Content
                    onClick={() =>
                        withFile && fileSaver.saveAs(content, content.split('filename')[1])
                    }
                    withCurrentUser={withCurrentUser}
                    withLastUserMessage={withLastUserMessage}
                    withFile={withFile}
                >
                    {withFile ? content.split('filename')[1] : content}
                    {withLastUserMessage && showAvatar()}
                </Styled.Content>
            )}
            {(withLastUserMessage || shouldDetailsAppear) && (
                <Styled.Date
                    withCurrentUser={withCurrentUser}
                    withLastUserMessage={withLastUserMessage}
                    shouldDetailsAppear={shouldDetailsAppear}
                >
                    {new Date().toDateString() === date.toDateString()
                        ? date.toLocaleTimeString()
                        : date.toLocaleString()}
                </Styled.Date>
            )}
        </MessageContainer>
    )
}

export default Message
