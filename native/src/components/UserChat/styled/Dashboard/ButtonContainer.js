import styled, { css } from 'styled-components'

import utils from 'utils'

export default styled.View`
    align-self: center;
    ${({ withMarginRight }) =>
        withMarginRight &&
        css`
            margin-right: ${utils.scale(8)}px;
        `}
`
