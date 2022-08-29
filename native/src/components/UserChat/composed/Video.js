import React, { useRef, useState } from 'react'
import Video from 'react-native-video'

import StyledMessage from '../styled/Message'

import utils from 'utils'

export default ({ source, onLoad, onError }) => {
    const video = useRef()
    const [isPaused, setIsPaused] = useState(true)
    const [shouldDisplayButton, setShouldDisplayButton] = useState(true)
    return (
        <StyledMessage.Container>
            <Video
                ref={video}
                source={source}
                onLoad={onLoad}
                onError={onError}
                paused={isPaused}
                resizeMode="contain"
                onLoad={() => video.current.seek(0)}
                onEnd={() => {
                    setIsPaused(true)
                    setShouldDisplayButton(true)
                }}
                style={{
                    width: utils.scalableDimension,
                    height: utils.scalableDimension
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
                            {isPaused ? 'Play' : 'Pause'}
                        </StyledMessage.ButtonText>
                    </StyledMessage.Button>
                )}
            </StyledMessage.ButtonContainer>
        </StyledMessage.Container>
    )
}
