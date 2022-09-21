import { useRef, useState } from 'react'
import styled from 'styled-components/macro'

import { useChatDetails } from '@online-library/core'

import * as Styled from './styled'
import { Button, UserContent, Warning } from 'components/shared/styled'

import { Messages, ProgressLoader } from './modules'

import { useChat } from './hooks'

import { detectMobileDevice } from 'helpers'

type ChatProps = {
   shouldMenuExpand?: boolean
}

export const Chat = ({ shouldMenuExpand }: ChatProps) => {
   const { lastUnreadMessageIndex } = useChatDetails()

   const textareaRef = useRef<HTMLTextAreaElement>(null)

   const [showFileInput, setShowFileInput] = useState(true)

   const [percentage, setPercentage] = useState(0)

   const {
      messagesRef,
      endOfMessages,
      currentUserId,
      messages,
      message,
      loading,
      setMessage,
      getUnreadMessages,
      sendMessage,
      sendFile,
      scrollToLastMessage,
      handleOnKeyPress,
      handleInfiniteLoader,
   } = useChat({
      setShowFileInput,
      setPercentage,
   })

   const areThereMessages = messages.length > 0

   const fileUploadInProgess = percentage > 0

   return (
      <ChatContainer shouldMenuExpand={shouldMenuExpand}>
         {!loading && lastUnreadMessageIndex && messages.length < lastUnreadMessageIndex && (
            <Styled.Details onClick={getUnreadMessages}>Unread messages</Styled.Details>
         )}
         {!loading &&
            (areThereMessages ? (
               <>
                  <Messages
                     ref={messagesRef}
                     endOfMessages={endOfMessages}
                     messages={messages}
                     currentUserId={currentUserId}
                     onTouchStart={() =>
                        detectMobileDevice() && textareaRef.current && textareaRef.current.blur()
                     }
                     onScroll={handleInfiniteLoader}
                     scrollToLastMessage={scrollToLastMessage}
                  />
                  <Styled.TextareaContainer>
                     <Styled.Textarea
                        ref={textareaRef}
                        value={message}
                        placeholder="Enter message..."
                        disabled={fileUploadInProgess}
                        onChange={event => setMessage(event.target.value)}
                        onFocus={() => scrollToLastMessage(500)}
                        onKeyPress={handleOnKeyPress}
                     />
                     {fileUploadInProgess ? (
                        <ProgressLoader percentage={percentage} />
                     ) : (
                        <Button as="label" htmlFor="file" withChat>
                           Upload file
                        </Button>
                     )}
                     {showFileInput && <Styled.FileInput onChange={sendFile} />}
                     <Button
                        onClick={() => {
                           sendMessage()
                           if (detectMobileDevice()) {
                              textareaRef.current?.focus()
                           }
                        }}
                        withChat
                     >
                        Send
                     </Button>
                  </Styled.TextareaContainer>
               </>
            ) : (
               <Warning>There are no messages</Warning>
            ))}
      </ChatContainer>
   )
}

const ChatContainer = styled(UserContent)`
   display: flex;
   justify-content: space-between;
   align-items: flex-start;
   flex-direction: column;
`
