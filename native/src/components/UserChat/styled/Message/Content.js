import styled, { css } from 'styled-components'

import Text from 'components/common/Text'

import utils from 'utils'

export default styled(Text)`
    max-width: 80%;
    ${({ withLetterSpacing }) =>
        withLetterSpacing &&
        css`
            letter-spacing: ${utils.scale(2)}px;
        `}
`
