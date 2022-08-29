import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { API_URL } from '@env'

import Dashboard from '../styled/Dashboard'

import ULComposed from 'components/UserLogin/composed'

const useBooksSuggestions = ({ freeBooks, setFreeBooks, paidBooks, setPaidBooks, withProfile }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [findByTitle, setFindByTitle] = useState(true)
    const [books, setBooks] = useState([])
    useEffect(() => {
        const getSuggestions = async () => {
            const url = `${API_URL}/api/user/getSuggestions`
            const response = await axios.post(url, {
                title,
                author,
                withProfile
            })
            if (response) {
                const { books } = response.data
                setBooks(books)
            }
        }
        getSuggestions()
    }, [title, author, withProfile])
    const switchFindBy = () => {
        findByTitle ? setTitle('') : setAuthor('')
        setFindByTitle(findByTitle => !findByTitle)
    }
    const handleSort = (id, price) => {
        const filterOut = book => book.id !== id
        const filter = book => book.id === id
        if (!price) {
            const sortedFreeBooks = freeBooks.filter(filterOut)
            const sortedFreeBook = freeBooks.find(filter) || books.find(filter)
            setFreeBooks([sortedFreeBook, ...sortedFreeBooks])
        } else {
            const sortedPaidBooks = paidBooks.filter(filterOut)
            const sortedPaidBook = paidBooks.find(filter) || books.find(filter)
            setPaidBooks([sortedPaidBook, ...sortedPaidBooks])
        }
        findByTitle ? setTitle('') : setAuthor('')
    }
    const renderBooksSuggestionsInput = () => (
        <Dashboard.InputContainer>
            {findByTitle ? (
                <ULComposed.Input
                    value={title}
                    placeholder="Type book's title..."
                    onChangeText={title => setTitle(title)}
                />
            ) : (
                <ULComposed.Input
                    value={author}
                    placeholder="Type author's name..."
                    onChangeText={author => setAuthor(author)}
                />
            )}
            <Dashboard.SwitcherContainer onPress={switchFindBy}>
                <Dashboard.Switcher>By {findByTitle ? 'author' : 'title'}</Dashboard.Switcher>
            </Dashboard.SwitcherContainer>
            <Dashboard.Suggestions>
                {books.map(({ id, title, author, price }) => (
                    <Dashboard.Suggestion key={id} onPress={() => handleSort(id, price)}>
                        "{title}" written by {author}
                    </Dashboard.Suggestion>
                ))}
            </Dashboard.Suggestions>
        </Dashboard.InputContainer>
    )
    return {
        renderBooksSuggestionsInput
    }
}

export default useBooksSuggestions
