import React, { useState } from 'react'

import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import Dashboard from '../styled/Dashboard'

import URComposed from 'components/UserRegistration/composed'

const BooksSuggestionsQuery = gql`
    query BooksSuggestions($title: String!, $author: String!, $withProfile: Boolean!) {
        booksSuggestions(title: $title, author: $author, withProfile: $withProfile) {
            id
            title
            author
            cover
            price
        }
    }
`

const useBooksSuggestions = ({ freeBooks, setFreeBooks, paidBooks, setPaidBooks, withProfile }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [findByTitle, setFindByTitle] = useState(true)
    const { data: booksSuggestions } = useQuery(BooksSuggestionsQuery, {
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
    const handleSort = (id, price) => {
        const filterOut = book => book.id !== id
        const filter = book => book.id === id
        if (booksSuggestions) {
            if (!price) {
                const sortedFreeBooks = freeBooks.filter(filterOut)
                const sortedFreeBook =
                    freeBooks.find(filter) || booksSuggestions.booksSuggestions.find(filter)
                setFreeBooks([sortedFreeBook, ...sortedFreeBooks])
            } else {
                const sortedPaidBooks = paidBooks.filter(filterOut)
                const sortedPaidBook =
                    paidBooks.find(filter) || booksSuggestions.booksSuggestions.find(filter)
                setPaidBooks([sortedPaidBook, ...sortedPaidBooks])
            }
            findByTitle ? setTitle('') : setAuthor('')
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
                        <Dashboard.Suggestion key={id} onClick={() => handleSort(id, price)}>
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
