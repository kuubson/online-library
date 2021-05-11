import styled, { css } from 'styled-components/macro'

export default styled.div`
    width: 100%;
    font-size: 13px;
    text-align: left;
    font-weight: bold;
    white-space: nowrap;
    ${({ withCurrentUser }) =>
        withCurrentUser &&
        css`
            text-align: right;
        `}
    ${({ withLastUserMessage, shouldDetailsAppear }) =>
        !withLastUserMessage &&
        shouldDetailsAppear &&
        css`
            margin-bottom: 10px;
        `}
`
