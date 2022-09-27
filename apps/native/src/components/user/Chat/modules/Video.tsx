import React, { useRef, useState } from 'react'
import _Video from 'react-native-video'

import { scalableDimension } from 'utils'

import * as StyledMessage from '../styled/Message'

export const Video = ({ source, onError }: any) => {
   const video = useRef<any>()

   const [isPaused, setIsPaused] = useState(true)

   const [shouldDisplayButton, setShouldDisplayButton] = useState(true)

   return (
      <StyledMessage.Container>
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
               width: scalableDimension,
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
                  <StyledMessage.ButtonText>{isPaused ? 'Play' : 'Pause'}</StyledMessage.ButtonText>
               </StyledMessage.Button>
            )}
         </StyledMessage.ButtonContainer>
      </StyledMessage.Container>
   )
}
