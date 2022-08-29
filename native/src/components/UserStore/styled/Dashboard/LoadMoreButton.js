import styled from 'styled-components'

import utils from 'utils'

export default styled.TouchableOpacity`
    width: 50%;
    height: ${utils.scale(50)}px;
    border-color: white;
    border-width: ${utils.scale(2)}px;
    border-radius: ${utils.scale(10)}px;
    margin-top: ${utils.scale(35)}px;
    justify-content: center;
    align-items: center;
    align-self: center;
`
