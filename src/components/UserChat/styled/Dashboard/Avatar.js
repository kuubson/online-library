import styled, { css } from 'styled-components/macro'

export default styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50px;
    background: white;
    color: black;
    font-weight: bold;
    margin-left: 15px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0px;
    right: -50px;
    ${({ withCurrentUser }) =>
        withCurrentUser &&
        css`
            left: -70px;
        `}
`
