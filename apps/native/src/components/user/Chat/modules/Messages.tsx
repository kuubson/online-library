/* eslint-disable react/display-name */
import type { RefObject } from 'react'
import React, { forwardRef } from 'react'
import type { ScrollView, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import styled from 'styled-components/native'

import { isChatInitialLoad, usePrevious } from '@online-library/core'

import type { MessagesProps } from '../types'

import { Message } from './Message'

export const Messages = forwardRef<ScrollView, MessagesProps>(
   (
      {
         endOfMessages,
         lastMessageBeforeFetch,
         messages,
         currentUserId,
         onScroll,
         scrollToLastMessage,
         onContentSizeChange,
      },
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
                     ref={
                        isLastMessageBeforeFetch
                           ? (lastMessageBeforeFetch as RefObject<TouchableOpacity>)
                           : null
                     }
                     key={message.id}
                     {...message}
                     currentUserId={currentUserId}
                     nextMessage={messages[index + 1]}
                     scrollToLastMessage={scrollToLastMessage}
                     withLastMessage={index === messages.length - 1}
                  />
               )
            })}
            <View ref={endOfMessages as MessagesProps['endOfMessages']}></View>
         </MessagesContainer>
      )
   }
)

const MessagesContainer = styled.ScrollView`
   width: 100%;
`
