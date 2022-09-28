import { forwardRef } from 'react'
import { TouchableOpacity, View } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'
import styled, { css } from 'styled-components/native'

import type { MessageAdditionalProps, MessageType } from '@online-library/config'

import { useMessage } from '@online-library/ui'

import { moderateScale } from 'styles'

import * as StyledMessage from '../styled/Message'
import { Video } from './Video'

type MessageProps = MessageType & MessageAdditionalProps

export const Message = forwardRef<HTMLDivElement, MessageProps>(
   (
      {
         type,
         content,
         filename,
         userId,
         user: { name },
         createdAt,
         currentUserId,
         nextMessage,
         scrollToLastMessage,
         withLastMessage,
      },
      ref
   ) => {
      const {
         imageError,
         videoError,
         shouldDetailsAppear,
         date,
         withFile,
         withCurrentUser,
         withLastUserMessage,
         scrollToTheBottom,
         setShouldDetailsAppear,
         handleFileLoadingError,
      } = useMessage({
         type,
         userId,
         createdAt,
         currentUserId,
         nextMessage,
         scrollToLastMessage,
         withLastMessage,
      })

      const downloadFile = () => {
         const { config, fs } = RNFetchBlob

         const { DownloadDir } = fs.dirs

         const options = {
            fileCache: true,
            addAndroidDownloads: {
               useDownloadManager: true,
               notification: true,
               path: `${DownloadDir}/${filename}`,
            },
         }

         config(options).fetch('GET', content)
      }

      const showError = (error: string) => (
         <StyledMessage.ContentContainer
            withCurrentUser={withCurrentUser}
            withLastUserMessage={withLastUserMessage}
         >
            <StyledMessage.Content withLetterSpacing>{error}</StyledMessage.Content>
            {withLastUserMessage && showAvatar()}
         </StyledMessage.ContentContainer>
      )

      const showAvatar = () => (
         <StyledMessage.AvatarContainer withCurrentUser={withCurrentUser}>
            <StyledMessage.Avatar>{name.charAt(0)}</StyledMessage.Avatar>
         </StyledMessage.AvatarContainer>
      )

      return (
         <MessageContainer
            ref={ref}
            onPress={() => setShouldDetailsAppear(true)}
            withCurrentUser={withCurrentUser}
            withLastUserMessage={withLastUserMessage && nextMessage}
         >
            {type === 'IMAGE' ? (
               !imageError ? (
                  <StyledMessage.Container>
                     <StyledMessage.Image
                        source={{
                           uri: content,
                        }}
                        resizeMode="contain"
                        onLoad={scrollToTheBottom}
                        onError={handleFileLoadingError}
                     />
                     {withLastUserMessage && showAvatar()}
                  </StyledMessage.Container>
               ) : (
                  showError('Image failed to load')
               )
            ) : type === 'VIDEO' ? (
               !videoError ? (
                  <Video source={{ uri: content }} onError={handleFileLoadingError} />
               ) : (
                  showError('Video failed to load')
               )
            ) : (
               <StyledMessage.ContentContainer
                  as={withFile ? TouchableOpacity : View}
                  onPress={() => withFile && downloadFile()}
                  withCurrentUser={withCurrentUser}
                  withLastUserMessage={withLastUserMessage}
               >
                  <StyledMessage.Content withLetterSpacing={withFile}>
                     {withFile ? filename : content}
                  </StyledMessage.Content>
                  {withLastUserMessage && showAvatar()}
               </StyledMessage.ContentContainer>
            )}
            {(withLastUserMessage || shouldDetailsAppear) && (
               <StyledMessage.Date
                  withCurrentUser={withCurrentUser}
                  withLastUserMessage={withLastUserMessage}
                  shouldDetailsAppear={shouldDetailsAppear}
               >
                  {new Date().toDateString() === date.toDateString()
                     ? date.toLocaleTimeString()
                     : date.toLocaleString()}
               </StyledMessage.Date>
            )}
         </MessageContainer>
      )
   }
)

type MessageContainerProps = {
   withCurrentUser: boolean
   withLastUserMessage: boolean
}

const MessageContainer = styled.TouchableOpacity<MessageContainerProps>`
   justify-content: center;
   align-items: flex-start;
   flex-direction: column;
   align-self: flex-start;
   position: relative;
   ${({ withCurrentUser }) =>
      withCurrentUser
         ? css`
              align-self: flex-end;
           `
         : null}
   ${({ withLastUserMessage }) =>
      withLastUserMessage
         ? css`
              margin-bottom: ${moderateScale(20)}px;
           `
         : null}
`
