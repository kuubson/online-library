import styled, { css } from 'styled-components/macro'

export default styled.button`
    font-size: 13px;
    padding: 8px 12px;
    background: #333;
    border-radius: 10px;
    transition: transform 0.3s ease-in-out;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%, 0px);
    :hover {
        transform: translate(-50%, 0px) scale(1.03);
    }
    @media (max-width: 900px) {
        font-size: 12px;
    }
    @media (max-width: 600px) {
        font-size: 11px;
    }
    ${({ price }) =>
        price &&
        css`
            padding: 8px 18px;
            ::after {
                text-shadow: -1px 0px black;
                font-weight: bold;
                content: '$${price.toFixed(2)}';
                position: absolute;
                top: -25px;
                left: 50%;
                transform: translate(-50%, 0px);
            }
        `}
    ${({ notAbsolute }) =>
        notAbsolute &&
        css`
            width: 70px;
            position: static;
            transform: translate(0px, 0px);
            :hover {
                transform: scale(1.03);
            }
            :nth-child(2) {
                margin-left: 20px;
            }
        `}
        ${({ withoutHover }) =>
        withoutHover &&
        css`
            cursor: initial;
            :hover {
                transform: translate(-50%, 0px);
            }
        `}
        ${({ withoutFixedWidth }) =>
        withoutFixedWidth &&
        css`
            width: auto;
        `}
        ${({ withMarginLeft }) =>
        withMarginLeft &&
        css`
            margin-left: 20px;
        `}
        ${({ withLoadMore }) =>
        withLoadMore &&
        css`
            width: 50%;
            height: 25%;
            background: none;
            border: 2px solid white;
        `}
        ${({ withChat }) =>
        withChat &&
        css`
            position: static;
            transform: none;
            white-space: nowrap;
            margin-right: 10px;
            letter-spacing: 1px;
            @media (max-width: 800px) {
                font-size: 10px;
            }
            :hover {
                transform: scale(1.03);
            }
        `}
`
