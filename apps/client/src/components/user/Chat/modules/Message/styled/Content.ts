import styled, { css } from 'styled-components'

type StyledProps = {
    withCurrentUser?: boolean
    withLastUserMessage?: boolean
    withFile?: boolean
    withError?: boolean
}

export const Content = styled.div<StyledProps>`
    width: max-content;
    max-width: 70vw;
    word-break: break-all;
    padding: 8px 10px;
    margin-bottom: 10px;
    white-space: pre-line;
    font-size: 15px;
    border-radius: 12px;
    color: white;
    background: rgba(0, 136, 255, 0.4);
    position: relative;
    @media (max-width: 1000px) {
        font-size: 14px;
    }
    @media (max-width: 700px) {
        font-size: 13px;
    }
    ${({ withCurrentUser }) =>
        withCurrentUser
            ? css`
                  align-self: flex-end;
              `
            : null}
    ${({ withCurrentUser, withLastUserMessage }) =>
        withLastUserMessage &&
        (withCurrentUser
            ? css`
                  border-bottom-left-radius: 2px;
              `
            : css`
                  border-bottom-right-radius: 2px;
              `)}
    ${({ withFile }) =>
        withFile
            ? css`
                  font-weight: bold;
                  cursor: pointer;
              `
            : null}
    ${({ withError }) =>
        withError
            ? css`
                  font-weight: bold;
              `
            : null}
`
