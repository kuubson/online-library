import React, { useState, useLayoutEffect, useEffect } from 'react'
import getCookie from '../../resources/helpers/getCookie'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { Buffer } from 'buffer'

import Navbar from '../Navbar/Navbar'
import StoreModal from '../StoreModal/StoreModal'
import Loader from '../Loader/Loader'
import StoreInput from './StoreInput'

const Store = props => {
    const [freeBooks, setFreeBooks] = useState([])
    const [paidBooks, setPaidBooks] = useState([])
    const [isLoading, setIsLoading] = useState()

    useLayoutEffect(() => {
        if (!getCookie('token')) props.history.push('/login')
    }, [])

    const dispatch = useDispatch()
    const shouldStoreModalAppear = useSelector(state => state.storeModal.shouldStoreModalAppear)
    const setShouldStoreModalAppear = payload => dispatch({ type: 'setShouldStoreModalAppear', payload })
    const setStoreModalData = payload => dispatch({ type: 'setStoreModalData', payload })
    const setApiResponseErrorMessage = payload => dispatch({ type: 'setApiResponseErrorMessage', payload })

    useEffect(() => {
        setIsLoading(true)
        axios.post('/getBooksForStore').then(res => {
            setIsLoading(false)
            setFreeBooks(res.data.filter(book => {
                return book.price === undefined
            }))
            setPaidBooks(res.data.filter(book => {
                return book.price !== undefined
            }))
        }).catch(error => {
            if (error) {
                setIsLoading(false)
                setApiResponseErrorMessage('Something went wrong, try again by refreshing page!')
            }
        })
    }, [])

    const handleClick = (author, title, cover, price) => {
        setStoreModalData({
            author,
            title,
            price,
            cover
        })
        setShouldStoreModalAppear(true)
    }
    return (
        <section className="store wrapper">
            <Navbar store />
            {shouldStoreModalAppear && <StoreModal />}
            <section className="books">
                <article className="books__column books__column--left">
                    <header className="books__header books__header--nomargintop">
                        <h2 className="books__header-text">Find here awesome books!</h2>
                        <StoreInput
                            isLoading={isLoading}
                            freeBooks={freeBooks}
                            paidBooks={paidBooks}
                            setFreeBooks={setFreeBooks}
                            setPaidBooks={setPaidBooks}
                        />
                    </header>
                    <div className="books__container">
                        {freeBooks && freeBooks.map(book => {
                            return (
                                <figure className="books__book" key={book._id}>
                                    <img className="book__image" src={`data:image/png;base64,${Buffer.from(book.cover.data.data).toString('base64')}`} alt={'Book' + book.title + ' written by ' + book.author} />
                                    <div className="book__details">
                                        <h3 className="book__author">{book.author}</h3>
                                        <h3 className="book__title">{book.title}</h3>
                                    </div>
                                    <button className="book__button" onClick={() => handleClick(book.author, book.title, `data:image/png;base64,${Buffer.from(book.cover.data.data).toString('base64')}`)}>Borrow</button>
                                </figure>
                            )
                        })}
                        {isLoading && <Loader absolute />}
                    </div>
                </article>
                <article className="books__column books__column--right">
                    <header className="books__header">
                        <h2 className="books__header-text">Choose premium books!</h2>
                    </header>
                    <div className="books__container">
                        {paidBooks && paidBooks.map(book => {
                            return (
                                <figure className="books__book" key={book._id}>
                                    <img className="book__image" src={`data:image/png;base64,${Buffer.from(book.cover.data.data).toString('base64')}`} alt={'Book' + book.title + ' written by ' + book.author} />
                                    <div className="book__details">
                                        <h3 className="book__author">{book.author}</h3>
                                        <h3 className="book__title">{book.title}</h3>
                                    </div>
                                    <p className="book__price">${book.price}</p>
                                    <button className="book__button" onClick={() => handleClick(book.author, book.title, `data:image/png;base64,${Buffer.from(book.cover.data.data).toString('base64')}`, book.price)}>Buy</button>
                                </figure>
                            )
                        })}
                        {isLoading && <Loader absolute />}
                    </div>
                </article>
            </section>
        </section>
    )
}

export default withRouter(Store)