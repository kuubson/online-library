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
    bottom: -2px;
    right: -50px;
    @media (max-width: 800px) {
        width: 30px;
        height: 30px;
        right: -40px;
    }
    ${({ withCurrentUser }) =>
        withCurrentUser &&
        css`
            left: -70px;
            @media (max-width: 800px) {
                left: -55px;
            }
        `}
`
