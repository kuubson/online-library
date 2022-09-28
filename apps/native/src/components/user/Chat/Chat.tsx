import React from 'react'
import Spinner from 'react-native-spinkit'
import styled from 'styled-components/native'

import { useChatDetails } from '@online-library/core'

import { useChat } from '@online-library/ui'

import { moderateScale } from 'styles'

import * as Styled from './styled'
import { Warning } from 'components/shared/styled'

import { Messages } from './modules'

export const Chat = () => {
   const {
      messagesRef,
      endOfMessages,
      currentUserId,
      loading,
      messages,
      message,
      isUploadingFile,
      setMessage,
      getUnreadMessages,
      sendMessage,
      sendFile,
      scrollToLastMessage,
   } = useChat()

   const { lastUnreadMessageIndex } = useChatDetails()

   const areThereMessages = !!messages.length

   return (
      <>
         <ChatContainer>
            {!loading && lastUnreadMessageIndex && messages.length < lastUnreadMessageIndex && (
               <Styled.MessagesInfo onPress={getUnreadMessages}>
                  <Styled.MessagesInfoText>Unread messages</Styled.MessagesInfoText>
               </Styled.MessagesInfo>
            )}
            {!loading &&
               (areThereMessages ? (
                  <Messages
                     ref={messagesRef}
                     endOfMessages={endOfMessages}
                     messages={messages}
                     currentUserId={currentUserId}
                     // TODO: handle scrolling
                     // onScroll={(e: any) => getMessages(20, messages.length, e)}
                     // onContentSizeChange={handleOnContentSizeChange}
                     scrollToLastMessage={scrollToLastMessage}
                  />
               ) : (
                  <Warning>There are no messages</Warning>
               ))}
         </ChatContainer>
         <Styled.TextareaContainer>
            <Styled.Textarea
               value={message}
               placeholder="Type your message..."
               placeholderTextColor="white"
               onChangeText={setMessage}
               textAlignVertical="top"
               multiline={true}
            />
            <Styled.ButtonsContainer>
               <Styled.ButtonContainer withMarginRight>
                  {!isUploadingFile ? (
                     // TODO: handle it properly
                     <Styled.Button onPress={sendFile}>
                        <Styled.ButtonText>Upload file</Styled.ButtonText>
                     </Styled.Button>
                  ) : (
                     <Spinner color="white" type="Bounce" size={moderateScale(50)} />
                  )}
               </Styled.ButtonContainer>
               <Styled.ButtonContainer>
                  <Styled.Button onPress={sendMessage}>
                     <Styled.ButtonText>Send</Styled.ButtonText>
                  </Styled.Button>
               </Styled.ButtonContainer>
            </Styled.ButtonsContainer>
         </Styled.TextareaContainer>
      </>
   )
}

const ChatContainer = styled.View`
   padding: ${moderateScale(10)}px ${moderateScale(15)}px ${moderateScale(15)}px
      ${moderateScale(15)}px;
   flex: 1;
`
