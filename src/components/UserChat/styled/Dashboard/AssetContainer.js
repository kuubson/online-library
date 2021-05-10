import styled, { css } from 'styled-components/macro'

export default styled.div`
    margin-bottom: 10px;
    border-radius: 12px;
    background: rgba(0, 136, 255, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    ${({ withLastMessage }) =>
        withLastMessage &&
        css`
            margin-bottom: 0px;
        `}
`
