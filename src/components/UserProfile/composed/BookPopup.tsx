import React from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'

import animations from 'assets/animations'

import USDashboard from 'components/UserStore/styled/Dashboard'

import USComposed from 'components/UserStore/composed'

import utils from 'utils'

import { IBook } from 'components/UserStore/UserStore'

interface IProps {
    setBookPopupData: React.Dispatch<React.SetStateAction<IBook | undefined>>
}

export const BookPopupContainer = styled.div`
    width: 100%;
    height: ${() => hooks.useHeight()};
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    animation: ${animations.fadeIn} 0.5s ease-in-out;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 4;
`

const BookPopup: React.FC<IBook & IProps> = ({
    id,
    title,
    author,
    cover,
    price,
    setBookPopupData
}) => {
    const resetBookPopup = () => setBookPopupData(undefined)
    return (
        <BookPopupContainer>
            <USDashboard.ContentContainer withFlips>
                <USComposed.Book
                    id={id}
                    title={title}
                    author={author}
                    cover={cover}
                    price={price}
                    withPopup
                    withFlips
                />
            </USDashboard.ContentContainer>
        </BookPopupContainer>
    )
}

export default BookPopup
