import React, { useState, useLayoutEffect, useEffect } from 'react'
import getCookie from '../../resources/helpers/getCookie'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import Navbar from '../Navbar/Navbar'
import Loader from '../Loader/Loader'

const Profile = props => {
    const [borrowedBooks, setBorrowedBooks] = useState([])
    const [boughtBooks, setBoughtBooks] = useState([])
    const [isLoading, setIsLoading] = useState()

    useLayoutEffect(() => {
        if (!getCookie('token')) props.history.push('/login')
    }, [])

    const dispatch = useDispatch()
    const email = useSelector(state => state.global.userEmail)
    const setApiResponseErrorMessage = payload => dispatch({ type: 'setApiResponseErrorMessage', payload })

    useEffect(() => {
        setIsLoading(true)
        axios.post('/getBooksForProfile', {
            email
        }).then(res => {
            setIsLoading(false)
            setBorrowedBooks(res.data.filter(book => {
                return book.price === undefined
            }))
            setBoughtBooks(res.data.filter(book => {
                return book.price !== undefined
            }))
        }).catch(error => {
            if (error) {
                setIsLoading(false)
                setApiResponseErrorMessage('Something went wrong, try again by refreshing page!')
            }
        })
    }, [])

    return (
        <section className="profile wrapper">
            <Navbar profile />
            <section className="books">
                <article className="books__column books__column--left">
                    <header className="books__header books__header--nomargintop">
                        <h2 className="books__header-text">Bought premium books are there here!</h2>
                    </header>
                    <div className="books__container">
                        {boughtBooks && boughtBooks.map(book => {
                            return (
                                <figure className="books__book" key={book.id}>
                                    <img className="book__image" src={book.cover} alt={'Book' + book.title + ' written by ' + book.author} />
                                    <div className="book__details">
                                        <h3 className="book__author">{book.author}</h3>
                                        <h3 className="book__title">{book.title}</h3>
                                    </div>
                                    <button className="book__button">Open</button>
                                </figure>
                            )
                        })}
                        {isLoading && <Loader absolute />}
                    </div>
                </article>
                <article className="books__column books__column--right">
                    <header className="books__header">
                        <h2 className="books__header-text">Enjoy reading your free books!</h2>
                    </header>
                    <div className="books__container">
                        {borrowedBooks && borrowedBooks.map(book => {
                            return (
                                <figure className="books__book" key={book.id}>
                                    <img className="book__image" src={book.cover} alt={'Book' + book.title + ' written by ' + book.author} />
                                    <div className="book__details">
                                        <h3 className="book__author">{book.author}</h3>
                                        <h3 className="book__title">{book.title}</h3>
                                    </div>
                                    <button className="book__button">Open</button>
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

export default withRouter(Profile)