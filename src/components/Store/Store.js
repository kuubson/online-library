import React, { useState, useLayoutEffect, useEffect } from 'react'
import getCookie from '../../resources/helpers/getCookie'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import validator from 'validator'
import axios from 'axios'
import { Buffer } from 'buffer'

import Navbar from '../Navbar/Navbar'
import StoreModal from '../StoreModal/StoreModal'
import Loader from '../Loader/Loader'

const Store = props => {
    const [bookTitle, setBookTitle] = useState('')
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
    const setApiResponseSuccessMessage = payload => dispatch({ type: 'setApiResponseSuccessMessage', payload })
    const setApiResponseErrorMessage = payload => dispatch({ type: 'setApiResponseErrorMessage', payload })
    const setApiResponseWarningMessage = payload => dispatch({ type: 'setApiResponseWarningMessage', payload })

    useEffect(() => {
        setIsLoading(true)
        axios.get('/getBooksForStore').then(res => {
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
    const validate = () => {
        validator.isEmpty(bookTitle) ? setApiResponseWarningMessage(`Give book's title!`) : setApiResponseWarningMessage('')
        if (!validator.isEmpty(bookTitle)) {
            return true
        } else {
            return false
        }
    }
    const findBook = e => {
        e.preventDefault()
        if (validate()) {
            setIsLoading(true)
            axios.post('/findBook', {
                bookTitle
            }).then(res => {
                setIsLoading(false)
                if (res.data.error) setApiResponseErrorMessage(res.data.errorMessage)
                if (res.data.warning) setApiResponseWarningMessage(res.data.warningMessage)
                if (res.data.success) {
                    setApiResponseSuccessMessage(res.data.successMessage)
                    if (res.data.book.price) {
                        let currentPaidBooks = [...paidBooks]
                        currentPaidBooks.unshift(res.data.book)
                        setFreeBooks(currentPaidBooks)
                    } else {
                        let currentFreeBooks = [...freeBooks]
                        currentFreeBooks.unshift(res.data.book)
                        setFreeBooks(currentFreeBooks)
                    }
                }
            }).catch(error => {
                if (error) {
                    setIsLoading(false)
                    setApiResponseErrorMessage('Something went wrong, try again by refreshing page!')
                }
            })
        }
    }
    return (
        <section className="store wrapper">
            <Navbar store />
            {shouldStoreModalAppear && <StoreModal />}
            <section className="books">
                <article className="books__column books__column--left">
                    <header className="books__header">
                        <h2 className="books__header-text">Find here awesome books!</h2>
                        {!isLoading &&
                            <form className="inputs" onSubmit={findBook}>
                                <div className="inputs__input-wrapper inputs__input-wrapper--row">
                                    <input id="bookTitle" className="inputs__input" name="bookTitle" type="text" placeholder="Type book's title..." value={bookTitle} onChange={e => setBookTitle(e.target.value)} />
                                    <button className="inputs__input-button--store">Find</button>
                                </div>
                            </form>}
                    </header>
                    <div className="books__container">
                        {freeBooks.length && freeBooks.map(book => {
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
                        {paidBooks.length && paidBooks.map(book => {
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