import React from 'react'
import styled from 'styled-components'
import { Actions } from 'react-native-router-flux'

import { API_URL } from '@env'

import hooks from 'hooks'

import Dashboard from '../styled/Dashboard'

import Composed from '.'

import utils from 'utils'

export const BookPopupContainer = styled.View`
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    z-index: 1;
`

const BookPopup = () => {
    const { cart, addToCart } = hooks.useCart()
    const { id, title, author, cover, price, setBookPopupData } = hooks.useBookPopup()
    const resetBookPopup = () => setBookPopupData({})
    const borrowBook = async () => {
        try {
            const url = `${API_URL}/api/user/borrowBook`
            const response = await utils.apiAxios.post(url, {
                id
            })
            if (response) {
                resetBookPopup()
                utils.setFeedbackData(
                    'Borrowing a book',
                    `You have successfully borrowed a book "${title}" written by ${author}`,
                    'Check it out in your profile',
                    () => Actions.UserProfile()
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
            <Dashboard.BookPopupScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Dashboard.BookPopupContent>
                    <Composed.Book
                        id={id}
                        title={title}
                        author={author}
                        cover={cover}
                        price={price}
                        withPopup
                        first
                    />
                    <Dashboard.Header black>
                        Are you sure you want to
                        {price ? ' add this book to the cart' : ' borrow this book'}?
                    </Dashboard.Header>
                    <Dashboard.Button onPress={price ? () => handleAdddingToCart(id) : borrowBook}>
                        <Dashboard.ButtonText>Yes</Dashboard.ButtonText>
                    </Dashboard.Button>
                    <Dashboard.Button onPress={() => resetBookPopup()} notAbsolute>
                        <Dashboard.ButtonText>No</Dashboard.ButtonText>
                    </Dashboard.Button>
                </Dashboard.BookPopupContent>
            </Dashboard.BookPopupScrollView>
        </BookPopupContainer>
    )
}

export default BookPopup
