import styled, { css } from 'styled-components'

import Text from 'components/common/Text'

import utils from 'utils'

export default styled(Text)`
    width: 100%;
    font-size: ${utils.scale(13)}px;
    text-align: left;
    letter-spacing: ${utils.scale(2)}px;
    ${({ withCurrentUser }) =>
        withCurrentUser &&
        css`
            align-self: flex-end;
        `}
    ${({ withLastUserMessage, shouldDetailsAppear }) =>
        !withLastUserMessage &&
        shouldDetailsAppear &&
        css`
            margin-bottom: ${utils.scale(10)}px;
        `};
`
