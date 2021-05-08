import styled, { css } from 'styled-components/macro'

export default styled.div`
    width: max-content;
    max-width: 50vw;
    word-break: break-all;
    padding: 8px 10px;
    margin-bottom: 8px;
    white-space: pre-line;
    font-size: 15px;
    border-radius: 12px;
    color: white;
    background: rgba(0, 136, 255, 0.4);
    align-self: flex-end;
    position: relative;
    @media (max-width: 1000px) {
        font-size: 14px;
    }
    @media (max-width: 700px) {
        font-size: 13px;
    }
    ${({ withLastUserMessage }) =>
        withLastUserMessage &&
        css`
            border-top-left-radius: 2px;
        `}
`
