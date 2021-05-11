import React, { forwardRef } from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'

import Composed from '.'

import animations from 'assets/animations'

const MessagesContainer = styled.div`
    width: 100%;
    height: ${() => `calc(${hooks.useHeight()} - 237px)`};
    padding: 1px 0px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    animation: ${animations.fadeIn} 0.5s ease-in-out;
    @media (max-width: 800px) {
        height: ${() => `calc(${hooks.useHeight()} - 225px)`};
    }
    ::-webkit-scrollbar {
        display: none;
    }
`

const Messages = forwardRef(
    (
        { endOfMessages, messages, currentUserId, onTouchStart, onScroll, scrollToLastMessage },
        ref
    ) => {
        return (
            <MessagesContainer ref={ref} onTouchStart={onTouchStart} onScroll={onScroll}>
                {messages.map(({ id, type, content, userId, nameInitial, createdAt }, index) => (
                    <Composed.Message
                        key={id}
                        id={id}
                        type={type}
                        content={content}
                        userId={userId}
                        nameInitial={nameInitial}
                        createdAt={createdAt}
                        nextMessage={messages[index + 1]}
                        currentUserId={currentUserId}
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
