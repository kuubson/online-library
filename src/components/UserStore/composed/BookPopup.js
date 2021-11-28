import React from 'react'
import styled from 'styled-components/macro'

import hooks from 'hooks'

import Dashboard from '../styled/Dashboard'

import Composed from '.'

import utils from 'utils'

import animations from 'assets/animations'

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

const BookPopup = ({ id, title, author, cover, price, setBookPopupData }) => {
    const { cart, addToCart } = hooks.useCart()
    const resetBookPopup = () => setBookPopupData(undefined)
    const borrowBook = async () => {
        try {
            const url = '/api/user/books/borrowBook'
            const response = await utils.apiAxios.post(url, {
                id
            })
            if (response) {
                resetBookPopup()
                utils.setFeedbackData(
                    'Borrowing a book',
                    `You have successfully borrowed a book "${title}" written by ${author}`,
                    'Check it out in your profile',
                    () => utils.redirectTo('/user/profile')
                )
            }
        } catch (error) {
            resetBookPopup()
        }
    }
    const handleAdddingToCart = async id => {
        if (cart.includes(id)) {
            resetBookPopup()
            return utils.setFeedbackData('Buying a book', 'This book is already in the cart')
        }
        addToCart(id)
        resetBookPopup()
        utils.setFeedbackData('Buying a book', 'The book has been added to the cart')
    }
    return (
        <BookPopupContainer>
            <Dashboard.ContentContainer>
                <Composed.Book
                    id={id}
                    title={title}
                    author={author}
                    cover={cover}
                    price={price}
                    withPopup
                />
                <Dashboard.Content>
                    <Dashboard.Header black>
                        Are you sure you want to
                        {price ? ' add this book to the cart' : ' borrow this book'}?
                    </Dashboard.Header>
                    <Dashboard.ButtonsContainer>
                        <Dashboard.Button
                            onClick={price ? () => handleAdddingToCart(id) : borrowBook}
                            notAbsolute
                        >
                            Yes
                        </Dashboard.Button>
                        <Dashboard.Button onClick={() => resetBookPopup()} notAbsolute>
                            No
                        </Dashboard.Button>
                    </Dashboard.ButtonsContainer>
                </Dashboard.Content>
            </Dashboard.ContentContainer>
        </BookPopupContainer>
    )
}

export default BookPopup
