/* eslint-disable react/display-name */
import React, { forwardRef } from 'react'
import styled, { css } from 'styled-components/macro'

import type { MessageType } from '@online-library/tools'
import { isChatInitialLoad } from '@online-library/tools'

import { usePrevious } from '@online-library/core'

import { fadeIn } from 'assets/animations'

import { Warning } from 'components/shared/styled'

import { Message } from '../'

type MessagesProps = {
   ref: React.RefObject<HTMLDivElement>
   endOfMessages: React.RefObject<HTMLDivElement>
   lastMessageBeforeFetch: React.RefObject<HTMLDivElement>
   messages: MessageType[]
   currentUserId: string | undefined
   onTouchStart: () => void
   onScroll: (event: React.UIEvent<HTMLDivElement>) => void
   scrollToLastMessage: (delay: number) => void
}

export const Messages = forwardRef<HTMLDivElement, MessagesProps>(
   (
      {
         endOfMessages,
         lastMessageBeforeFetch,
         messages,
         currentUserId,
         onTouchStart,
         onScroll,
         scrollToLastMessage,
      },
      ref
   ) => {
      const areThereMessages = messages.length > 0

      const previousChat = usePrevious(messages)

      return (
         <MessagesContainer
            ref={ref}
            onTouchStart={onTouchStart}
            onScroll={onScroll}
            areThereMessages={areThereMessages}
         >
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
            <div ref={endOfMessages}></div>
            {!areThereMessages && <Warning>There are no messages</Warning>}
         </MessagesContainer>
      )
   }
)

type MessagesContainerProps = {
   areThereMessages: boolean
}

const MessagesContainer = styled.div<MessagesContainerProps>`
   width: 100%;
   min-height: calc(100vh - (var(--textareaHeight) + var(--userContentPadding)));
   max-height: calc(100vh - (var(--textareaHeight) + var(--userContentPadding)));
   padding-bottom: 15px;
   overflow: auto;
   animation: ${fadeIn} 0.5s ease-in-out;
   ::-webkit-scrollbar {
      display: none;
   }
   ${({ areThereMessages }) =>
      !areThereMessages
         ? css`
              display: flex;
              justify-content: center;
              align-items: center;
           `
         : null}
`
