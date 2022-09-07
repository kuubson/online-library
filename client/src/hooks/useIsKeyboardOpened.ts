import { useEffect, useState } from 'react'

import { detectMobileDevice } from 'helpers'

export const useIsKeyboardOpened = () => {
   const [initialHeight, setInitialHeight] = useState(window.innerHeight)

   const [isKeyboardOpened, setIsKeyboardOpened] = useState(false)

   useEffect(() => {
      const handleInitialHeight = () => setInitialHeight(window.innerHeight)

      window.addEventListener('resize', handleInitialHeight)
      window.addEventListener('scroll', handleInitialHeight)

      return () => {
         window.removeEventListener('resize', handleInitialHeight)
         window.removeEventListener('scroll', handleInitialHeight)
      }
   }, [])

   useEffect(() => {
      const handlePopupHeight = () => {
         setIsKeyboardOpened(detectMobileDevice() && initialHeight > window.innerHeight)
      }

      window.addEventListener('resize', handlePopupHeight)

      return () => window.removeEventListener('resize', handlePopupHeight)
   }, [initialHeight])

   return isKeyboardOpened
}
