/* eslint-disable react/display-name */
import React, { forwardRef } from 'react'
import styled from 'styled-components/macro'

import { fadeIn } from 'assets/animations'

import { Message } from '../'

type MessagesProps = {
   ref: React.RefObject<HTMLDivElement>
   endOfMessages: React.RefObject<HTMLDivElement>
   messages: Message[]
   currentUserId: string | undefined
   onTouchStart: () => void
   onScroll: (event: React.UIEvent<HTMLDivElement>) => Promise<void>
   scrollToLastMessage: (delay: number) => void
}

export const Messages = forwardRef<HTMLDivElement, MessagesProps>(
   (
      { endOfMessages, messages, currentUserId, onTouchStart, onScroll, scrollToLastMessage },
      ref
   ) => (
      <MessagesContainer ref={ref} onTouchStart={onTouchStart} onScroll={onScroll}>
         {messages.map((message, index) => (
            <Message
               key={message.id}
               {...message}
               currentUserId={currentUserId}
               nextMessage={messages[index + 1]}
               scrollToLastMessage={scrollToLastMessage}
               withLastMessage={index === messages.length - 1}
            />
         ))}
         <div ref={endOfMessages}></div>
      </MessagesContainer>
   )
)

const MessagesContainer = styled.div`
   width: 100%;
   height: calc(100vh - 237px);
   padding: 1px 0px;
   overflow: auto;
   display: flex;
   flex-direction: column;
   animation: ${fadeIn} 0.5s ease-in-out;
   ::-webkit-scrollbar {
      display: none;
   }
   @media (max-width: 800px) {
      height: calc(100vh - 225px);
   }
`
