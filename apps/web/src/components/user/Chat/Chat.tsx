import { useRef } from 'react'
import styled from 'styled-components/macro'

import { detectMobileDevice, useChatDetails } from '@online-library/core'

import { useChat } from '@online-library/logic'

import * as Styled from './styled'
import { Button, UserContent } from 'components/shared/styled'

import { Messages, ProgressLoader } from './modules'

export const Chat = () => {
   const {
      messagesRef,
      endOfMessages,
      lastMessageBeforeFetch,
      currentUserId,
      messages,
      message,
      loading,
      isUploadingFile,
      percentage,
      showFileInput,
      setMessage,
      getUnreadMessages,
      sendMessage,
      sendFile,
      scrollToLastMessage,
      handleOnKeyPress,
      handleInfiniteLoader,
   } = useChat()

   const { lastUnreadMessageIndex } = useChatDetails()

   const textareaRef = useRef<HTMLTextAreaElement>(null)

   return (
      <ChatContainer>
         {!loading && lastUnreadMessageIndex && messages.length < lastUnreadMessageIndex && (
            <Styled.Details onClick={getUnreadMessages}>Unread messages</Styled.Details> // TODO: verify counter (badge above "Chat" option)
         )}
         {!loading && (
            <>
               <Messages
                  ref={messagesRef}
                  endOfMessages={endOfMessages}
                  lastMessageBeforeFetch={lastMessageBeforeFetch}
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
                     disabled={isUploadingFile}
                     onChange={event => setMessage(event.target.value)}
                     onFocus={() => scrollToLastMessage(500)}
                     onKeyPress={handleOnKeyPress}
                  />
                  {isUploadingFile ? (
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
         )}
      </ChatContainer>
   )
}

const ChatContainer = styled(UserContent)`
   display: flex;
   justify-content: space-between;
   align-items: flex-start;
   flex-direction: column;
`
