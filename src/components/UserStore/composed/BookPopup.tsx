import React from 'react'
import styled from 'styled-components/macro'

import animations from 'assets/animations'

import Dashboard from '../styled/Dashboard'

import Book from './Book'

import { IBook } from '../UserStore'

interface IProps {
    setBookPopupData: React.Dispatch<React.SetStateAction<IBook | undefined>>
}

const BookPopupContainer = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    animation: ${animations.fadeIn} 0.5s ease-in-out;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
`

const BookPopup: React.FC<IBook & IProps> = ({
    id,
    title,
    author,
    cover,
    price,
    setBookPopupData
}) => {
    return (
        <BookPopupContainer>
            <Dashboard.ContentContainer>
                <Book id={id} title={title} author={author} cover={cover} price={price} fullWidth />
                <Dashboard.Content>
                    <Dashboard.Header black>
                        That's just a small step from getting this book. Are you sure you want to
                        borrow this book?
                    </Dashboard.Header>
                    <Dashboard.ButtonsContainer>
                        <Dashboard.Button notAbsolute>Yes</Dashboard.Button>
                        <Dashboard.Button onClick={() => setBookPopupData(undefined)} notAbsolute>
                            No
                        </Dashboard.Button>
                    </Dashboard.ButtonsContainer>
                </Dashboard.Content>
            </Dashboard.ContentContainer>
        </BookPopupContainer>
    )
}

export default BookPopup
