import React, { forwardRef } from 'react'
import styled from 'styled-components'

import Composed from '.'

import animations from 'assets/animations'

const MessagesContainer = styled.div`
    width: 100%;
    height: calc(100vh - 237px);
    padding: 1px 0px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    animation: ${animations.fadeIn} 0.5s ease-in-out;
    ::-webkit-scrollbar {
        display: none;
    }
    @media (max-width: 800px) {
        height: calc(100vh - 225px);
    }
`

interface IMessages {
    ref: React.RefObject<HTMLDivElement>
    endOfMessages: React.RefObject<HTMLDivElement>
    messages: IMessage[]
    currentUserId: string | undefined
    onTouchStart: () => void
    onScroll: (event: React.UIEvent<HTMLDivElement>) => Promise<void>
    scrollToLastMessage: (delay: number) => void
}

const Messages = forwardRef<HTMLDivElement, IMessages>(
    (
        { endOfMessages, messages, currentUserId, onTouchStart, onScroll, scrollToLastMessage },
        ref
    ) => {
        return (
            <MessagesContainer ref={ref} onTouchStart={onTouchStart} onScroll={onScroll}>
                {messages.map(({ id, type, content, userId, userName, createdAt }, index) => (
                    <Composed.Message
                        key={id}
                        id={id}
                        type={type}
                        content={content}
                        userId={userId}
                        userName={userName}
                        createdAt={createdAt}
                        currentUserId={currentUserId}
                        nextMessage={messages[index + 1]}
                        scrollToLastMessage={scrollToLastMessage}
                        withLastMessage={index === messages.length - 1}
                    />
                ))}
                <div ref={endOfMessages}></div>
            </MessagesContainer>
        )
    }
)

export default Messages
