import styled from 'styled-components'

import utils from 'utils'

export default styled.View`
    width: 100%;
    height: ${utils.scale(1.5)}px;
    background: white;
    margin-bottom: ${({ noMargin }) => (noMargin ? 0 : utils.scale(6))}px;
`
