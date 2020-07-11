import React from 'react'
import styled from 'styled-components/macro'

import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import hooks from 'hooks'

import animations from 'assets/animations'

import Dashboard from '../styled/Dashboard'

import Book from './Book'

import utils from 'utils'

import { IBook } from '../UserStore'

interface IProps {
    setBookPopupData: React.Dispatch<React.SetStateAction<IBook | undefined>>
}

const borrowBookMutation = gql`
    mutation($bookId: ID!) {
        borrowBook(bookId: $bookId) {
            title
            author
        }
    }
`

const BookPopupContainer = styled.div`
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
    const [borrowBook] = useMutation<{
        borrowBook: IBook
    }>(borrowBookMutation)
    const handleBorrow = async () => {
        try {
            const { data } = await borrowBook({
                variables: {
                    bookId: id
                }
            })
            if (data) {
                const { title, author } = data.borrowBook
                setBookPopupData(undefined)
                utils.setFeedbackData(
                    'Borrowing a book',
                    `You have successfully borrowed a book "${title}" written by ${author}`,
                    'Check it out in your profile',
                    () => utils.redirectTo('/user/profile')
                )
            }
        } catch (error) {
            setBookPopupData(undefined)
        }
    }
    const handleAddToCart = async () => {}
    return (
        <BookPopupContainer>
            <Dashboard.ContentContainer>
                <Book id={id} title={title} author={author} cover={cover} price={price} withPopup />
                <Dashboard.Content>
                    <Dashboard.Header black>
                        That's just a small step from getting this book. Are you sure you want to
                        {price ? ' add this book to the cart' : ' borrow this book'}?
                    </Dashboard.Header>
                    <Dashboard.ButtonsContainer>
                        <Dashboard.Button
                            onClick={price ? handleAddToCart : handleBorrow}
                            notAbsolute
                        >
                            Yes
                        </Dashboard.Button>
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
