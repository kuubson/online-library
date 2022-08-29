import styled, { css } from 'styled-components'

import utils from 'utils'

export default styled.View`
    width: ${utils.scale(30)}px;
    height: ${utils.scale(30)}px;
    border-radius: ${utils.scale(15)}px;
    background: white;
    margin-left: ${utils.scale(15)}px;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: -${utils.scale(2)}px;
    right: -${utils.scale(40)}px;
    ${({ withCurrentUser }) =>
        withCurrentUser &&
        css`
            left: -${utils.scale(55)}px;
        `}
`
