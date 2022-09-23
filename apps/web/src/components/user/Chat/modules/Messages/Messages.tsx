/* eslint-disable react/display-name */
import React, { forwardRef, useEffect, useRef } from 'react'
import styled from 'styled-components/macro'

import type { MessageType } from '@online-library/core'
import { isChatInitialLoad, usePrevious } from '@online-library/core'

import { queries } from 'styles'

import { fadeIn } from 'assets/animations'

import { Message } from '../'

type MessagesProps = {
   ref: React.RefObject<HTMLDivElement>
   endOfMessages: React.RefObject<HTMLDivElement>
   messages: MessageType[]
   currentUserId: string | undefined
   onTouchStart: () => void
   onScroll: (event: React.UIEvent<HTMLDivElement>) => void
   scrollToLastMessage: (delay: number) => void
}

export const Messages = forwardRef<HTMLDivElement, MessagesProps>(
   (
      { endOfMessages, messages, currentUserId, onTouchStart, onScroll, scrollToLastMessage },
      ref
   ) => {
      const previousChat = usePrevious(messages)

      const lastMessageBeforeFetch = useRef<HTMLDivElement>(null)

      useEffect(() => {
         if (lastMessageBeforeFetch.current) {
            lastMessageBeforeFetch.current.scrollIntoView() // TODO: trigger it only when fetching more messages
         }
      }, [messages])

      return (
         <MessagesContainer ref={ref} onTouchStart={onTouchStart} onScroll={onScroll}>
            {messages.map((message, index) => {
               const isLastMessageBeforeFetch =
                  !isChatInitialLoad(messages) && message.id === previousChat?.[0]?.id

               // TODO: verify order of messages

               return (
                  <Message
                     ref={isLastMessageBeforeFetch ? lastMessageBeforeFetch : null}
                     // TODO: duplicated keys, investigate why
                     key={message.id}
                     {...message}
                     currentUserId={currentUserId}
                     nextMessage={messages[index + 1]}
                     scrollToLastMessage={scrollToLastMessage}
                     withLastMessage={index === messages.length - 1}
                  />
               )
            })}
            <div ref={endOfMessages}></div>
         </MessagesContainer>
      )
   }
)

const MessagesContainer = styled.div`
   width: 100%;
   max-height: calc(100vh - (var(--textareaHeight) + var(--userContentPadding)));
   padding-bottom: 15px;
   overflow: auto;
   animation: ${fadeIn} 0.5s ease-in-out;
   ::-webkit-scrollbar {
      display: none;
   }
   @media ${queries.largeTablet} {
      max-height: calc(100vh - (var(--textareaHeight) + var(--userContentPadding)));
   }
`
