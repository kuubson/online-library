import styled from 'styled-components'

import utils from 'utils'

export default styled.TextInput`
    color: white;
    padding: ${utils.scale(10)}px;
    flex: 1;
    background: transparent;
    font-size: ${utils.scale(13)}px;
    @media (max-width: 800px) {
        font-size: ${utils.scale(11)}px;
    }
`
