import { useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'
import styled, { css } from 'styled-components/native'

import { moderateScale } from 'styles'

import * as StyledMessage from '../styled/Message'
import { Video } from './Video'

export const Message = ({
   type,
   content,
   userId,
   user: { name },
   createdAt,
   currentUserId,
   nextMessage,
   scrollToLastMessage,
   withLastMessage,
}: any) => {
   const [shouldDetailsAppear, setShouldDetailsAppear] = useState(false)

   const [imageError, setImageError] = useState(false)

   const [videoError, setVideoError] = useState(false)

   const date = new Date(createdAt)

   const withCurrentUser = userId === currentUserId

   const withLastUserMessage = (nextMessage && userId !== nextMessage.userId) || !nextMessage

   const withFile = type === 'FILE'

   useEffect(() => {
      scrollToTheBottom()
   }, [])

   useEffect(() => {
      if (shouldDetailsAppear) {
         setTimeout(() => setShouldDetailsAppear(false), 3000)
      }
   }, [shouldDetailsAppear])

   const scrollToTheBottom = () => withLastMessage && scrollToLastMessage()

   const downloadFile = () => {
      const { config, fs } = RNFetchBlob
      const { DownloadDir } = fs.dirs
      const options = {
         fileCache: true,
         addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: `${DownloadDir}/${content.split('filename')[1]}`, // TODO: filename comes from props
         },
      }
      config(options).fetch('GET', content)
   }

   const handleFileLoadingError = () =>
      type === 'IMAGE' ? setImageError(true) : setVideoError(true)

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
                  {withFile ? content.split('filename')[1] : content}
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
