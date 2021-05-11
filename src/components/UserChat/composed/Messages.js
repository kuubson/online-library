import React, { forwardRef } from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'

import Dashboard from '../styled/Dashboard'

import Composed from '.'

const MessagesContainer = styled.div`
    width: 100%;
    height: ${() => `calc(${hooks.useHeight()} - 237px)`};
    padding: 1px 0px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    @media (max-width: 800px) {
        height: ${() => `calc(${hooks.useHeight()} - 225px)`};
    }
    ::-webkit-scrollbar {
        display: none;
    }
`

const Messages = forwardRef(
    (
        { messages, endOfMessages, currentUserId, onTouchStart, onScroll, scrollToLastMessage },
        ref
    ) => {
        return (
            <MessagesContainer ref={ref} onTouchStart={onTouchStart} onScroll={onScroll}>
                {messages.map(({ id, type, content, userId, nameInitial }, index) => {
                    const withCurrentUser = userId === currentUserId
                    const message = messages[index]
                    const nextMessage = messages[index + 1]
                    const withLastUserMessage =
                        (message && nextMessage && message.userId !== nextMessage.userId) ||
                        !nextMessage
                    const withLastMessage = index === messages.length - 1
                    const withFile = type === 'FILE'
                    const showAvatar = () => (
                        <Dashboard.Avatar withCurrentUser={withCurrentUser}>
                            {nameInitial}
                        </Dashboard.Avatar>
                    )
                    return (
                        <Composed.Message
                            key={id}
                            id={id}
                            type={type}
                            content={content}
                            nextMessage={nextMessage}
                            showAvatar={showAvatar}
                            scrollToLastMessage={scrollToLastMessage}
                            withCurrentUser={withCurrentUser}
                            withLastUserMessage={withLastUserMessage}
                            withLastMessage={withLastMessage}
                            withFile={withFile}
                            withCurrentUser={withCurrentUser}
                        />
                    )
                })}
                <div ref={endOfMessages}></div>
            </MessagesContainer>
        )
    }
)

export default Messages
