import styled from 'styled-components'

import utils from 'utils'

export default styled.TouchableOpacity`
    padding: ${utils.scale(10)}px;
    background: rgba(0, 136, 255, 0.4);
    box-shadow: 0px 0px ${utils.scale(10)}px black;
    border-radius: ${utils.scale(20)}px;
    position: absolute;
    top: ${utils.scale(15)}px;
    align-self: center;
    elevation: 1;
    z-index: 1;
`
