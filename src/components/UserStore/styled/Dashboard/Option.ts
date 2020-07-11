import styled, { css } from 'styled-components/macro'

interface ISCProps {
    shouldExpandMenu: boolean
    cartItemsAmount?: number
}

export default styled.li`
    font-size: 17px;
    margin-right: 40px;
    cursor: pointer;
    position: relative;
    :last-of-type {
        margin-right: 0px;
    }
    @media (max-width: 1200px) {
        font-size: 16px;
        margin-right: 35px;
    }
    @media (max-width: 1000px) {
        font-size: 15px;
        margin-right: 30px;
    }
    @media (max-width: 800px) {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 0px;
        margin-bottom: 30px;
        :last-of-type {
            margin-bottom: 0px;
        }
    }
    @media (min-width: 800px) {
        opacity: 1;
    }
    @media (max-width: 500px) {
        font-size: 14px;
    }
    ${({ shouldExpandMenu }: ISCProps) =>
        shouldExpandMenu
            ? css`
                  opacity: 1;
                  transition: opacity 0.5s ease-in-out;
              `
            : css`
                  opacity: 0;
                  transition: opacity 0.25s ease-in-out;
              `}
    ${({ cartItemsAmount }) =>
        cartItemsAmount &&
        css`
            ::after {
                width: 18px;
                height: 18px;
                cursor: initial;
                content: '${cartItemsAmount}';
                padding-top: 2px;
                padding-left: 1.5px;
                font-size: 12px;
                font-weight: bold;
                color: black;
                background: white;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                top: -18px;
                right: -18px;
                @media (max-width: 800px) {
                    position: static;
                    margin-left: 8px;
                }
            }
    `}
`
