import React, { useRef, useState } from 'react'
import _Video from 'react-native-video'

import { t } from '@online-library/core'

import { moderateScale } from 'styles'

import * as StyledMessage from '../styled/Message'

import { scalableDimension } from 'utils'

export const Video = ({ source, onError }: any) => {
   const video = useRef<any>()

   const [isPaused, setIsPaused] = useState(true)

   const [shouldDisplayButton, setShouldDisplayButton] = useState(true)

   return (
      <>
         <_Video
            ref={ref => (video.current = ref)}
            source={source}
            onError={onError}
            paused={isPaused}
            resizeMode="contain"
            onLoad={() => video.current.seek(0)}
            onEnd={() => {
               setIsPaused(true)
               setShouldDisplayButton(true)
            }}
            style={{
               width: scalableDimension - moderateScale(40),
               height: scalableDimension,
            }}
         />
         <StyledMessage.ButtonContainer
            onPress={() => setShouldDisplayButton(shouldDisplayButton => !shouldDisplayButton)}
         >
            {shouldDisplayButton && (
               <StyledMessage.Button
                  onPress={() => {
                     setIsPaused(isPaused => !isPaused)
                     isPaused && setShouldDisplayButton(false)
                  }}
               >
                  <StyledMessage.ButtonText>
                     {isPaused ? t('buttons.play') : t('buttons.pause')}
                  </StyledMessage.ButtonText>
               </StyledMessage.Button>
            )}
         </StyledMessage.ButtonContainer>
      </>
   )
}
