import styled, { css } from 'styled-components/macro'

interface ISCProps {
    withLessHeight?: boolean
    isKeyboardOpened?: boolean
    withFlips?: boolean
}

export default styled.div`
    width: 60%;
    height: 70%;
    background: white;
    padding: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 1150px) {
        width: 55%;
        height: 80%;
        flex-direction: column;
    }
    @media (max-width: 900px) {
        width: 80%;
        height: 80%;
    }
    @media (max-width: 600px) {
        width: 90%;
        height: 90%;
    }
    ${({ withLessHeight }: ISCProps) =>
        withLessHeight &&
        css`
            height: 50% !important;
            @media (max-width: 600px) {
                height: 60% !important;
            }
        `};
    ${({ isKeyboardOpened }: ISCProps) =>
        isKeyboardOpened &&
        css`
            height: 80% !important;
            @media (max-width: 600px) {
                height: 80% !important;
            }
        `};
    ${({ withFlips }: ISCProps) =>
        withFlips &&
        css`
            width: 55% !important;
            height: 70% !important;
            justify-content: center;
            perspective: 1000px;
        `};
`
