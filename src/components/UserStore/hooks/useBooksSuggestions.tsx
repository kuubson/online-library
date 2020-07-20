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
    const handleSort = (id: string, price: number) => {
        const filterOut = (book: IBook) => book.id !== id
        const filter = (book: IBook) => book.id === id
        if (!price) {
            if (findByTitle) {
                const freeBooksByTitle = freeBooks.filter(filterOut)
                const freeBookByTitle = freeBooks.find(filter)!
                setFreeBooks([freeBookByTitle, ...freeBooksByTitle])
            } else {
                const freeBooksByAuthor = freeBooks.filter(filterOut)
                const freeBookByAuthor = freeBooks.find(filter)!
                setFreeBooks([freeBookByAuthor, ...freeBooksByAuthor])
            }
        } else {
            if (findByTitle) {
                const paidBooksByTitle = paidBooks.filter(filterOut)
                const paidBookByTitle = paidBooks.find(filter)!
                setPaidBooks([paidBookByTitle, ...paidBooksByTitle])
            } else {
                const paidBooksByAuthor = paidBooks.filter(filterOut)
                const paidBookByAuthor = paidBooks.find(filter)!
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
                        <Dashboard.Suggestion key={id} onClick={() => handleSort(id, price!)}>
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
