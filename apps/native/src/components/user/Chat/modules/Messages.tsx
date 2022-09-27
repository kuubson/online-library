import React, { forwardRef } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'

import { Message } from './Message'

export const Messages = forwardRef(
   (
      {
         endOfMessages,
         messages,
         currentUserId,
         onScroll,
         onContentSizeChange,
         scrollToLastMessage,
      }: any,
      ref
   ) => (
      <MessagesContainer ref={ref} onScroll={onScroll} onContentSizeChange={onContentSizeChange}>
         {messages.map(({ id, type, content, userId, userName, createdAt }: any, index: any) => (
            <Message
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
)

const MessagesContainer = styled.ScrollView`
   width: 100%;
`
