import React, { forwardRef } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'

import { MessageType } from '@online-library/config'

import { isChatInitialLoad, usePrevious } from '@online-library/core'

import { Message } from './Message'

type MessagesProps = {
   ref: React.RefObject<any>
   endOfMessages: React.RefObject<any>
   lastMessageBeforeFetch: React.RefObject<any>
   messages: MessageType[]
   currentUserId: string | undefined
   onScroll: (event: any) => void
   scrollToLastMessage: (delay: number) => void
   onContentSizeChange: (_: any, h: number) => void
}

export const Messages = forwardRef(
   (
      {
         endOfMessages,
         lastMessageBeforeFetch,
         messages,
         currentUserId,
         onScroll,
         scrollToLastMessage,
         onContentSizeChange,
      }: MessagesProps,
      ref
   ) => {
      const previousChat = usePrevious(messages)
      return (
         <MessagesContainer ref={ref} onScroll={onScroll} onContentSizeChange={onContentSizeChange}>
            {messages.map((message, index) => {
               const isLastMessageBeforeFetch =
                  !isChatInitialLoad(messages) && message.id === previousChat?.[0]?.id
               return (
                  <Message
                     ref={isLastMessageBeforeFetch ? lastMessageBeforeFetch : null}
                     key={message.id}
                     {...message}
                     currentUserId={currentUserId}
                     nextMessage={messages[index + 1]}
                     scrollToLastMessage={scrollToLastMessage}
                     withLastMessage={index === messages.length - 1}
                  />
               )
            })}
            <View ref={endOfMessages}></View>
         </MessagesContainer>
      )
   }
)

const MessagesContainer = styled.ScrollView`
   width: 100%;
`
