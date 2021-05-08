import styled, { css } from 'styled-components/macro'

export default styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    align-self: flex-start;
    ${({ withCurrentUser }) =>
        withCurrentUser &&
        css`
            align-self: flex-end;
        `}
    ${({ withLastUserMessage }) =>
        withLastUserMessage &&
        css`
            margin-bottom: 25px;
        `}
`
