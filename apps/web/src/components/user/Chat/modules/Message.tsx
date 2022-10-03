/* eslint-disable react/display-name */
import fileSaver from 'file-saver'
import { forwardRef } from 'react'
import styled, { css } from 'styled-components/macro'

import type { MessageAdditionalProps, MessageType } from '@online-library/config'

import { t } from '@online-library/core'

import { useMessage } from '@online-library/logic'

import * as Styled from '../styled/Message'

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

      const showError = (error: string) => (
         <Styled.Content
            withCurrentUser={withCurrentUser}
            withLastUserMessage={withLastUserMessage}
            withError
         >
            {error}
            {withLastUserMessage && showAvatar()}
         </Styled.Content>
      )

      const showAvatar = () => (
         <Styled.Avatar withCurrentUser={withCurrentUser}>{name?.charAt(0)}</Styled.Avatar>
      )

      return (
         <MessageContainer
            ref={ref}
            onClick={() => setShouldDetailsAppear(true)}
            withCurrentUser={withCurrentUser}
            withLastUserMessage={!!withLastUserMessage && !!nextMessage}
         >
            {type === 'IMAGE' ? (
               !imageError ? (
                  <Styled.Container withCurrentUser={withCurrentUser}>
                     <Styled.Image
                        src={content}
                        onLoad={scrollToTheBottom}
                        onError={handleFileLoadingError}
                     />
                     {withLastUserMessage && showAvatar()}
                  </Styled.Container>
               ) : (
                  showError(t('common.failedImageLoading'))
               )
            ) : type === 'VIDEO' ? (
               !videoError ? (
                  <Styled.Container withCurrentUser={withCurrentUser}>
                     <Styled.Video
                        src={content}
                        controls
                        onLoadStart={scrollToTheBottom}
                        onError={handleFileLoadingError}
                     />
                     {withLastUserMessage && showAvatar()}
                  </Styled.Container>
               ) : (
                  showError(t('common.failedVideoLoading'))
               )
            ) : (
               <Styled.Content
                  onClick={() => withFile && fileSaver.saveAs(content, filename)}
                  withCurrentUser={withCurrentUser}
                  withLastUserMessage={withLastUserMessage}
                  withFile={withFile}
               >
                  {withFile ? filename : content}
                  {withLastUserMessage && showAvatar()}
               </Styled.Content>
            )}
            {(withLastUserMessage || shouldDetailsAppear) && (
               <Styled.Date
                  withCurrentUser={withCurrentUser}
                  withLastUserMessage={withLastUserMessage}
                  shouldDetailsAppear={shouldDetailsAppear}
               >
                  {new Date().toDateString() === date.toDateString()
                     ? date.toLocaleTimeString()
                     : date.toLocaleString()}
               </Styled.Date>
            )}
         </MessageContainer>
      )
   }
)

type MessageContainerProps = {
   withCurrentUser?: boolean
   withLastUserMessage?: boolean
}

const MessageContainer = styled.div<MessageContainerProps>`
   display: flex;
   justify-content: center;
   align-items: flex-start;
   flex-direction: column;
   align-self: flex-start;
   cursor: pointer;
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
              margin-bottom: 20px;
           `
         : null}
`
