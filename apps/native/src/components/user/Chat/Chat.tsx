import React from 'react'
import Spinner from 'react-native-spinkit'
import styled from 'styled-components/native'

import { t, useChatDetails } from '@online-library/core'

import { useChat } from '@online-library/logic'

import { moderateScale } from 'styles'

import * as Styled from './styled'
import { Warning } from 'components/shared/styled'

import { Messages } from './modules'

import type { MessagesProps } from './types'

export const Chat = () => {
   const {
      messagesRef,
      endOfMessages,
      lastMessageBeforeFetch,
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
      handleInfiniteLoader,
      handleOnContentSizeChange,
   } = useChat()

   const { lastUnreadMessageIndex } = useChatDetails()

   const areThereMessages = !!messages.length

   return (
      <>
         <ChatContainer>
            {!loading && !!lastUnreadMessageIndex && messages.length < lastUnreadMessageIndex && (
               <Styled.MessagesInfo onPress={getUnreadMessages}>
                  <Styled.MessagesInfoText>{t('common.unreadBadge')}</Styled.MessagesInfoText>
               </Styled.MessagesInfo>
            )}
            {!loading &&
               (areThereMessages ? (
                  <Messages
                     ref={messagesRef as MessagesProps['ref']}
                     endOfMessages={endOfMessages as MessagesProps['endOfMessages']}
                     lastMessageBeforeFetch={
                        lastMessageBeforeFetch as MessagesProps['lastMessageBeforeFetch']
                     }
                     messages={messages}
                     currentUserId={currentUserId}
                     onScroll={handleInfiniteLoader as unknown as MessagesProps['onScroll']}
                     scrollToLastMessage={scrollToLastMessage}
                     onContentSizeChange={handleOnContentSizeChange}
                  />
               ) : (
                  <Warning>{t('common.noMessages')}</Warning>
               ))}
         </ChatContainer>
         <Styled.TextareaContainer>
            <Styled.Textarea
               value={message}
               placeholder={t('inputs.message.placeholder')}
               placeholderTextColor="white"
               onChangeText={setMessage}
               textAlignVertical="top"
               multiline={true}
            />
            <Styled.ButtonsContainer>
               <Styled.ButtonContainer withMarginRight>
                  {!isUploadingFile ? (
                     <Styled.Button onPress={sendFile}>
                        <Styled.ButtonText>{t('buttons.upload')}</Styled.ButtonText>
                     </Styled.Button>
                  ) : (
                     <Spinner color="white" type="Bounce" size={moderateScale(50)} />
                  )}
               </Styled.ButtonContainer>
               <Styled.ButtonContainer>
                  <Styled.Button onPress={sendMessage}>
                     <Styled.ButtonText>{t('buttons.send')}</Styled.ButtonText>
                  </Styled.Button>
               </Styled.ButtonContainer>
            </Styled.ButtonsContainer>
         </Styled.TextareaContainer>
      </>
   )
}

const ChatContainer = styled.View`
   padding: ${moderateScale(10)}px ${moderateScale(15)}px ${moderateScale(95)}px
      ${moderateScale(15)}px;
   flex: 1;
`
