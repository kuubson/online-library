import React, { useState } from 'react'

import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import Dashboard from '../styled/Dashboard'

import URComposed from 'components/UserRegistration/composed'

import { IBook } from '../UserStore'

interface IProps {
    freeBooks: IBook[]
    setFreeBooks: React.Dispatch<React.SetStateAction<IBook[]>>
    paidBooks: IBook[]
    setPaidBooks: React.Dispatch<React.SetStateAction<IBook[]>>
    withProfile: boolean
}

interface BooksSuggestionsQueryData {
    booksSuggestions: IBook[]
}

const BooksSuggestionsQuery = gql`
    query BooksSuggestions($title: String!, $author: String!, $withProfile: Boolean!) {
        booksSuggestions(title: $title, author: $author, withProfile: $withProfile) {
            id
            title
            author
            price
        }
    }
`

const useBooksSuggestions = ({
    freeBooks,
    setFreeBooks,
    paidBooks,
    setPaidBooks,
    withProfile
}: IProps) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [findByTitle, setFindByTitle] = useState(true)
    const { data: booksSuggestions } = useQuery<BooksSuggestionsQueryData>(BooksSuggestionsQuery, {
        variables: {
            title,
            author,
            withProfile
        }
    })
    const switchFindBy = () => {
        findByTitle ? setTitle('') : setAuthor('')
        setFindByTitle(findByTitle => !findByTitle)
    }
    const handleSort = (title: string, author: string, price: number) => {
        if (!price) {
            if (findByTitle) {
                const freeBooksByTitle = freeBooks.filter(book => book.title !== title)
                const freeBookByTitle = freeBooks.find(book => book.title === title)!
                setFreeBooks([freeBookByTitle, ...freeBooksByTitle])
            } else {
                const freeBooksByAuthor = freeBooks.filter(book => book.author !== author)
                const freeBookByAuthor = freeBooks.find(book => book.author === author)!
                setFreeBooks([freeBookByAuthor, ...freeBooksByAuthor])
            }
        } else {
            if (findByTitle) {
                const paidBooksByTitle = paidBooks.filter(book => book.title !== title)
                const paidBookByTitle = paidBooks.find(book => book.title === title)!
                setPaidBooks([paidBookByTitle, ...paidBooksByTitle])
            } else {
                const paidBooksByAuthor = paidBooks.filter(book => book.author !== author)
                const paidBookByAuthor = paidBooks.find(book => book.author === author)!
                setPaidBooks([paidBookByAuthor, ...paidBooksByAuthor])
            }
        }
        if (findByTitle) {
            setTitle('')
        } else {
            setAuthor('')
        }
    }
    const renderBooksSuggestionsInput = () => (
        <Dashboard.InputContainer>
            {findByTitle ? (
                <URComposed.Input
                    id="title"
                    type="text"
                    value={title}
                    placeholder="Type book's title..."
                    error=""
                    onChange={({ target }) => setTitle(target.value)}
                    withBooksSuggestions
                />
            ) : (
                <URComposed.Input
                    id="author"
                    type="text"
                    value={author}
                    placeholder="Type author's name..."
                    error=""
                    onChange={({ target }) => setAuthor(target.value)}
                    withBooksSuggestions
                />
            )}
            <Dashboard.Switcher onClick={switchFindBy}>
                By {findByTitle ? 'author' : 'title'}
            </Dashboard.Switcher>
            <Dashboard.SuggestionsContainer>
                {booksSuggestions &&
                    booksSuggestions.booksSuggestions.map(({ id, title, author, price }) => (
                        <Dashboard.Suggestion
                            key={id}
                            onClick={() => handleSort(title, author, price!)}
                        >
                            "{title}" written by {author}
                        </Dashboard.Suggestion>
                    ))}
            </Dashboard.SuggestionsContainer>
        </Dashboard.InputContainer>
    )
    return {
        renderBooksSuggestionsInput
    }
}

export default useBooksSuggestions
