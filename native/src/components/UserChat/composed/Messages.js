import React, { forwardRef } from 'react'
import { View } from 'react-native'
import styled from 'styled-components'

import Composed from '.'

const MessagesContainer = styled.ScrollView`
    width: 100%;
`

const Messages = forwardRef(
    (
        {
            endOfMessages,
            messages,
            currentUserId,
            onScroll,
            onContentSizeChange,
            scrollToLastMessage
        },
        ref
    ) => {
        return (
            <MessagesContainer
                ref={ref}
                onScroll={onScroll}
                onContentSizeChange={onContentSizeChange}
            >
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
                <View ref={endOfMessages}></View>
            </MessagesContainer>
        )
    }
)

export default Messages
