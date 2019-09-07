import React, { useState, useLayoutEffect } from 'react'
import getCookie from '../../resources/helpers/getCookie'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import validator from 'validator'
import axios from 'axios'

import Navbar from '../Navbar/Navbar'
import StoreModal from '../StoreModal/StoreModal'

const Store = props => {
    const [bookTitle, setBookTitle] = useState('')

    useLayoutEffect(() => {
        if (!getCookie('token')) props.history.push('/login')
    }, [])

    const dispatch = useDispatch()
    const shouldStoreModalAppear = useSelector(state => state.storeModal.shouldStoreModalAppear)
    const setShouldStoreModalAppear = payload => dispatch({ type: 'setShouldStoreModalAppear', payload })
    const setStoreModalData = payload => dispatch({ type: 'setStoreModalData', payload })
    const setIsLoading = payload => dispatch({ type: 'setIsLoading', payload })
    const setApiResponseSuccessMessage = payload => dispatch({ type: 'setApiResponseSuccessMessage', payload })
    const setApiResponseErrorMessage = payload => dispatch({ type: 'setApiResponseErrorMessage', payload })
    const setApiResponseWarningMessage = payload => dispatch({ type: 'setApiResponseWarningMessage', payload })

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
                    // if (res.data.book.price) {
                    //     props.updatePaidBooks(res.data.book)
                    // } else {
                    //     props.updateFreeBooks(res.data.book)
                    // }
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
                        <form className="inputs" onSubmit={findBook}>
                            <div className="inputs__input-wrapper inputs__input-wrapper--row">
                                <input id="bookTitle" className="inputs__input" name="bookTitle" type="bookTitle" placeholder="Type book's title..." value={bookTitle} onChange={e => setBookTitle(e.target.value)} />
                                <button className="inputs__input-button">Find</button>
                            </div>
                        </form>
                    </header>
                    <div className="books__container">
                        <figure className="books__book">
                            <img className="book__image" src="https://picsum.photos/200/300" alt="random photo" />
                            <div className="book__details">
                                <h3 className="book__author">Alan Goodis</h3>
                                <h3 className="book__title">Way Up</h3>
                            </div>
                            <button className="book__button" onClick={() => handleClick('okej', 'siema', 'https://picsum.photos/200/300')}>Borrow</button>
                        </figure>
                    </div>
                </article>
                <article className="books__column books__column--right">
                    <header className="books__header">
                        <h2 className="books__header-text">Choose premium books!</h2>
                    </header>
                    <div className="books__container">
                        <figure className="books__book">
                            <img className="book__image" src="https://picsum.photos/200/300" alt="random photo" />
                            <div className="book__details">
                                <h3 className="book__author">Alan Goodis</h3>
                                <h3 className="book__title">Way Up</h3>
                            </div>
                            <p className="book__price">$4.99</p>
                            <button className="book__button" onClick={() => handleClick('okej', 'siema', 'https://picsum.photos/200/300', 5.55)}>Buy</button>
                        </figure>
                    </div>
                </article>
            </section>
        </section>
    )
}

export default withRouter(Store)