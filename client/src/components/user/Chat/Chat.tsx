import React, { useRef, useState } from 'react'
import styled, { css } from 'styled-components/macro'

import * as Styled from './styled'

import { StoreContainer } from 'components/user/Store/Store'
import { Warning } from 'components/user/Store/modules/Books/styled'
import * as StyledStore from 'components/user/Store/styled'

import { Messages, ProgressLoader } from './modules'

import { useMessagesInfo } from 'hooks'

import { useChat } from './hooks'

import { detectMobileDevice } from 'helpers'

type ChatProps = {
   shouldMenuExpand?: boolean
}

export const Chat = ({ shouldMenuExpand }: ChatProps) => {
   const { lastUnreadMessageIndex } = useMessagesInfo()

   const textareaRef = useRef<HTMLTextAreaElement>(null)

   const [loading, setLoading] = useState(true)

   const [showFileInput, setShowFileInput] = useState(true)

   const [percentage, setPercentage] = useState(0)

   const {
      messagesRef,
      endOfMessages,
      currentUserId,
      messages,
      message,
      setMessage,
      getMessages,
      getUnreadMessages,
      sendMessage,
      sendFile,
      scrollToLastMessage,
   } = useChat({
      setLoading,
      setShowFileInput,
      setPercentage,
   })

   const areThereMessages = messages.length > 0

   const fileUploadInProgess = percentage > 0

   const handleOnKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === 'Enter') {
         switch (true) {
            case detectMobileDevice() as boolean:
               return
            case !event.currentTarget.value.trim():
               event.preventDefault()
               break
            case !event.shiftKey:
               sendMessage()
               break
         }
      }
   }

   return (
      <ChatContainer shouldMenuExpand={shouldMenuExpand} areThereMessages={areThereMessages}>
         {!loading && lastUnreadMessageIndex && messages.length < lastUnreadMessageIndex && (
            <Styled.MessagesInfo onClick={getUnreadMessages}>Unread messages</Styled.MessagesInfo>
         )}
         {!loading &&
            (areThereMessages ? (
               <Messages
                  ref={messagesRef}
                  endOfMessages={endOfMessages}
                  messages={messages}
                  currentUserId={currentUserId}
                  onTouchStart={() =>
                     detectMobileDevice() && textareaRef.current && textareaRef.current.blur()
                  }
                  onScroll={event => getMessages(20, messages.length, event)}
                  scrollToLastMessage={scrollToLastMessage}
               />
            ) : (
               <Warning>There are no messages</Warning>
            ))}
         <Styled.TextareaContainer>
            <Styled.Textarea
               ref={textareaRef}
               value={message}
               placeholder="Type your message..."
               disabled={fileUploadInProgess}
               onChange={event => setMessage(event.target.value)}
               onFocus={() => scrollToLastMessage(500)}
               onKeyPress={handleOnKeyPress}
            />
            {fileUploadInProgess ? (
               <ProgressLoader percentage={percentage} />
            ) : (
               <StyledStore.Button as="label" htmlFor="file" withChat>
                  Upload file
               </StyledStore.Button>
            )}
            {showFileInput && <Styled.FileInput onChange={sendFile} />}
            <StyledStore.Button
               onClick={() => {
                  sendMessage()
                  if (detectMobileDevice()) {
                     textareaRef.current?.focus()
                  }
               }}
               withChat
            >
               Send
            </StyledStore.Button>
         </Styled.TextareaContainer>
      </ChatContainer>
   )
}

type ChatContainerProps = {
   areThereMessages?: boolean
}

const ChatContainer = styled(StoreContainer)<ChatContainerProps>`
   ${({ areThereMessages }) =>
      areThereMessages
         ? css`
              justify-content: flex-start;
           `
         : css`
              height: 100vh;
              padding-bottom: 90px;
              align-items: center;
           `}
`
