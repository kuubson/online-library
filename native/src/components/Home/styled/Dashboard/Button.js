import styled from 'styled-components'

import utils from 'utils'

export default styled.TouchableOpacity`
    width: 50%;
    height: ${utils.scale(55)}px;
    background: #333333;
    margin-bottom: ${({ noMargin }) => (noMargin ? 0 : utils.scale(25))}px;
    border-right-width: ${utils.scale(2)}px;
    border-right-color: white;
    border-left-width: ${utils.scale(2)}px;
    border-left-color: white;
    justify-content: center;
    align-items: center;
`
