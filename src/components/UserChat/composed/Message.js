import React from 'react'
import styled, { css } from 'styled-components/macro'
import fileSaver from 'file-saver'

import Dashboard from '../styled/Dashboard'

const MessageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    align-self: flex-start;
    ${({ withCurrentUser }) =>
        withCurrentUser &&
        css`
            align-self: flex-end;
        `}
    ${({ withLastUserMessage }) =>
        withLastUserMessage &&
        css`
            margin-bottom: 20px;
        `}
`

const Message = ({
    type,
    content,
    nextMessage,
    showAvatar,
    scrollToLastMessage,
    withCurrentUser,
    withLastUserMessage,
    withLastMessage,
    withFile
}) => {
    return (
        <MessageContainer
            withCurrentUser={withCurrentUser}
            withLastUserMessage={withLastUserMessage && nextMessage}
        >
            {type === 'IMAGE' ? (
                <Dashboard.AssetContainer withLastMessage={withLastMessage}>
                    <Dashboard.Image
                        src={content}
                        onLoad={() => withLastMessage && scrollToLastMessage(0)}
                        onError={e => (e.target.parentNode.parentNode.style.display = 'none')}
                    />
                    {withLastUserMessage && showAvatar()}
                </Dashboard.AssetContainer>
            ) : type === 'VIDEO' ? (
                <Dashboard.AssetContainer>
                    <Dashboard.Video
                        src={content}
                        controls
                        onLoadStart={() => withLastMessage && scrollToLastMessage(0)}
                        onError={e => (e.target.parentNode.parentNode.style.display = 'none')}
                        withLastMessage={withLastMessage}
                    />
                    {withLastUserMessage && showAvatar()}
                </Dashboard.AssetContainer>
            ) : (
                <Dashboard.Message
                    onClick={() =>
                        withFile && fileSaver.saveAs(content, content.split('filename')[1])
                    }
                    withCurrentUser={withCurrentUser}
                    withLastUserMessage={withLastUserMessage}
                    withLastMessage={withLastMessage}
                    withFile={withFile}
                >
                    {withFile ? content.split('filename')[1] : content}
                    {withLastUserMessage && showAvatar()}
                </Dashboard.Message>
            )}
        </MessageContainer>
    )
}

export default Message
