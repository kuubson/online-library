import styled from 'styled-components'

import utils from 'utils'

export default styled.TouchableOpacity`
    width: 50%;
    min-height: ${utils.scale(50)}px;
    padding: ${utils.scale(10)}px ${utils.scale(20)}px;
    background: ${({ withFacebook }) => (withFacebook ? '#1877f2' : 'transparent')};
    margin-bottom: ${({ noMargin }) => (noMargin ? 0 : utils.scale(25))}px;
    border-width: ${({ withFacebook }) => (withFacebook ? 0 : utils.scale(2))}px;
    border-radius: ${({ withFacebook }) => (withFacebook ? utils.scale(5) : 0)}px;
    border-color: white;
    justify-content: center;
    align-items: center;
`
