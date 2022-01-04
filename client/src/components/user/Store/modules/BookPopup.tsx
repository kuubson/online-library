import React from 'react'
import styled from 'styled-components'
import { gql, useMutation } from '@apollo/client'

import Book from './Book'

import * as Styled from '../styled'

import { fadeIn } from 'assets/animations'

import { useCart } from 'hooks'

import { setApiFeedback } from 'helpers'

import { history } from 'utils'

type BorrowBookMutation = {
    borrowBook: {
        title: string
        author: string
    }
}

const borrowBookMutation = gql`
    mutation ($bookId: ID!) {
        borrowBook(bookId: $bookId) {
            title
            author
        }
    }
`

export const BookPopupContainer = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    animation: ${fadeIn} 0.5s ease-in-out;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 4;
`

interface IBookPopup extends IBook {
    setBookPopupData: ReactDispatch<IBook | undefined>
}

const BookPopup: React.FC<IBookPopup> = ({ id, title, author, cover, price, setBookPopupData }) => {
    const { cart, addToCart } = useCart()
    const resetBookPopup = () => setBookPopupData(undefined)
    const [borrowBook] = useMutation<BorrowBookMutation>(borrowBookMutation)
    const handleBorrowingBook = async () => {
        try {
            const { data } = await borrowBook({
                variables: {
                    bookId: id
                }
            })
            if (data) {
                const { title, author } = data.borrowBook
                resetBookPopup()
                setApiFeedback(
                    'Borrowing a book',
                    `You have successfully borrowed a book "${title}" written by ${author}`,
                    'Check it out in your profile',
                    () => history.push('/profile')
                )
            }
        } catch (error) {
            resetBookPopup()
        }
    }
    const handleAdddingToCart = async (id: number) => {
        if (cart.includes(id)) {
            resetBookPopup()
            return setApiFeedback('Buying a book', 'This book is already in the cart', 'Okey')
        }
        addToCart(id)
        resetBookPopup()
        setApiFeedback('Buying a book', 'The book has been added to the cart', 'Okey')
    }
    return (
        <BookPopupContainer>
            <Styled.ContentContainer>
                <Book id={id} title={title} author={author} cover={cover} price={price} withPopup />
                <Styled.Content>
                    <Styled.Header black>
                        Are you sure you want to
                        {price ? ' add this book to the cart' : ' borrow this book'}?
                    </Styled.Header>
                    <Styled.ButtonsContainer>
                        <Styled.Button
                            onClick={price ? () => handleAdddingToCart(id) : handleBorrowingBook}
                            notAbsolute
                        >
                            Yes
                        </Styled.Button>
                        <Styled.Button onClick={() => resetBookPopup()} notAbsolute>
                            No
                        </Styled.Button>
                    </Styled.ButtonsContainer>
                </Styled.Content>
            </Styled.ContentContainer>
        </BookPopupContainer>
    )
}

export default BookPopup
