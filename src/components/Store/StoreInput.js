import React, { useState } from 'react'
import validator from 'validator'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import StoreSuggestions from './StoreSuggestions'

const StoreInput = ({ isLoading, freeBooks, paidBooks, setFreeBooks, setPaidBooks }) => {
    const [bookTitle, setBookTitle] = useState('')
    const [suggestions, setSuggestions] = useState([])

    const dispatch = useDispatch()
    const setApiResponseSuccessMessage = payload => dispatch({ type: 'setApiResponseSuccessMessage', payload })
    const setApiResponseErrorMessage = payload => dispatch({ type: 'setApiResponseErrorMessage', payload })
    const setApiResponseWarningMessage = payload => dispatch({ type: 'setApiResponseWarningMessage', payload })
    const setIsLoading = payload => dispatch({ type: 'setIsLoading', payload })
    const validate = () => {
        validator.isEmpty(bookTitle) ? setApiResponseWarningMessage(`Give book's title!`) : setApiResponseWarningMessage('')
        if (!validator.isEmpty(bookTitle)) {
            return true
        } else {
            return false
        }
    }
    const findBook = (e, title) => {
        e.preventDefault()
        if (validate()) {
            setIsLoading(true)
            axios.post('/findBook', {
                bookTitle: title
            }).then(res => {
                setIsLoading(false)
                if (res.data.error) setApiResponseErrorMessage(res.data.errorMessage)
                if (res.data.warning) setApiResponseWarningMessage(res.data.warningMessage)
                if (res.data.success) {
                    setBookTitle('')
                    setApiResponseSuccessMessage(res.data.successMessage)
                    if (res.data.book.price) {
                        let currentPaidBooks = [...paidBooks]
                        currentPaidBooks.unshift(res.data.book)
                        setPaidBooks(currentPaidBooks)
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
        <>
            {!isLoading &&
                <form className="inputs inputs--store" onSubmit={e => findBook(e, bookTitle)}>
                    <div className="inputs__input-wrapper inputs__input-wrapper--row">
                        <input autoComplete="off" id="bookTitle" className="inputs__input" name="bookTitle" type="text" placeholder="Type book's title..." value={bookTitle} onChange={e => {
                            setBookTitle(e.target.value)
                            if (e.target.value !== "") {
                                axios.post('/suggestBook', {
                                    title: e.target.value
                                }).then(res => {
                                    if (res.data.error) setApiResponseErrorMessage(res.data.errorMessage)
                                    setSuggestions(res.data)
                                }).catch(error => {
                                    if (error) {
                                        setIsLoading(false)
                                        setApiResponseErrorMessage('Something went wrong, try again by refreshing page!')
                                    }
                                })
                            } else {
                                setSuggestions([])
                            }
                        }} />
                        <button className="inputs__input-button--store">Find</button>
                        <StoreSuggestions
                            suggestions={suggestions}
                            setBookTitle={setBookTitle}
                            setSuggestions={setSuggestions}
                            findBook={findBook}
                        />
                    </div>
                </form>
            }
        </>
    )
}

export default StoreInput