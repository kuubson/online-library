import { useEffect, useState } from 'react'

export const useMessage = ({
   type,
   userId,
   createdAt,
   currentUserId,
   nextMessage,
   scrollToLastMessage,
   withLastMessage,
}: any) => {
   const [shouldDetailsAppear, setShouldDetailsAppear] = useState(false)

   const [imageError, setImageError] = useState(false)

   const [videoError, setVideoError] = useState(false)

   useEffect(() => {
      scrollToTheBottom()
   }, [])

   useEffect(() => {
      if (shouldDetailsAppear) {
         setTimeout(() => setShouldDetailsAppear(false), 3000)
      }
   }, [shouldDetailsAppear])

   const scrollToTheBottom = () => {
      if (withLastMessage) {
         scrollToLastMessage(0)
      }
   }

   const handleFileLoadingError = () => {
      type === 'IMAGE' ? setImageError(true) : setVideoError(true)
   }

   const date = new Date(createdAt)

   const withFile = type === 'FILE'

   const withCurrentUser = userId === currentUserId

   const withLastUserMessage = (nextMessage && userId !== nextMessage.userId) || !nextMessage

   return {
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
   }
}
