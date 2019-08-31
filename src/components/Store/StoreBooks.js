import React, { useState, useLayoutEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import StoreFreeBooks from './StoreFreeBooks'
import StorePaidBooks from './StorePaidBooks'
import StoreBooksHeader from './StoreBooksHeader'
import StoreBooksHeaderTitle from './StoreBooksHeaderTitle'
import StorePaidBooksContainer from './StorePaidBooksContainer'
import StoreFreeBooksHeaderInput from './StoreFreeBooksHeaderInput'
import StoreFreeBooksContainer from './StoreFreeBooksContainer'

const StoreBooksWrapper = styled.div`
    margin: 20px;
    margin-top: 0px;
    display: flex;
    flex: 1;
    align-self: stretch;
`;

const StoreBooks = () => {
    const [freeBooks, setFreeBooks] = useState([])
    const [paidBooks, setPaidBooks] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    useLayoutEffect(() => {
        setIsLoading(true)
        axios.get('/getBooksForStore').then(res => {
            setIsLoading(false)
            setFreeBooks(res.data.filter(book => {
                return book.price === undefined
            }))
            setPaidBooks(res.data.filter(book => {
                return book.price !== undefined
            }))
        })
    }, [])
    const updateFreeBooks = book => {
        let currentBooks = [...freeBooks];
        currentBooks.unshift(book)
        setFreeBooks(currentBooks)
    }
    const updatePaidBooks = book => {
        let currentBooks = [...paidBooks]
        currentBooks.unshift(book)
        setPaidBooks(currentBooks)
    }
    return (
        <StoreBooksWrapper>
            <StoreFreeBooks>
                <StoreBooksHeader>
                    <StoreBooksHeaderTitle title="Find here awesome books!" />
                    <StoreFreeBooksHeaderInput updateFreeBooks={updateFreeBooks} updatePaidBooks={updatePaidBooks} />
                </StoreBooksHeader>
                <StoreFreeBooksContainer isLoading={isLoading} freeBooks={freeBooks} />
            </StoreFreeBooks>
            <StorePaidBooks>
                <StoreBooksHeader>
                    <StoreBooksHeaderTitle title="Choose premium books!" />
                </StoreBooksHeader>
                <StorePaidBooksContainer isLoading={isLoading} paidBooks={paidBooks} />
            </StorePaidBooks>
        </StoreBooksWrapper>
    )
}

export default StoreBooks