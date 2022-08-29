import styled from 'styled-components'

import utils from 'utils'

export default styled.TouchableOpacity`
    width: ${utils.scale(70)}px;
    height: ${utils.scale(70)}px;
    background: rgba(0, 136, 255, 0.6);
    padding-right: ${utils.scale(3)}px;
    padding-bottom: ${utils.scale(2)}px;
    border-radius: ${utils.scale(35)}px;
    justify-content: center;
    align-items: center;
`
