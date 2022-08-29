import styled, { css } from 'styled-components'

import utils from 'utils'

export default styled.View`
    padding: ${utils.scale(8)}px ${utils.scale(10)}px;
    margin-bottom: ${utils.scale(10)}px;
    font-size: ${utils.scale(15)}px;
    border-radius: ${utils.scale(12)}px;
    color: white;
    background: rgba(0, 136, 255, 0.4);
    position: relative;
    @media (max-width: 1000px) {
        font-size: ${utils.scale(14)}px;
    }
    @media (max-width: 700px) {
        font-size: ${utils.scale(13)}px;
    }
    ${({ withCurrentUser }) =>
        withCurrentUser &&
        css`
            align-self: flex-end;
        `}
    ${({ withCurrentUser, withLastUserMessage }) =>
        withLastUserMessage &&
        (withCurrentUser
            ? css`
                  border-bottom-left-radius: ${utils.scale(2)}px;
              `
            : css`
                  border-bottom-right-radius: ${utils.scale(2)}px;
              `)}
`
