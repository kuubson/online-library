import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import uuid from 'uuid'

const StoreModal = () => {
    const dispatch = useDispatch()
    const author = useSelector(state => state.storeModal.storeModalData.author)
    const title = useSelector(state => state.storeModal.storeModalData.title)
    const price = useSelector(state => state.storeModal.storeModalData.price)
    const cover = useSelector(state => state.storeModal.storeModalData.cover)
    const email = useSelector(state => state.global.userEmail)
    const cart = useSelector(state => state.global.cart)
    const setShouldStoreModalAppear = payload => dispatch({ type: 'setShouldStoreModalAppear', payload })
    const setApiResponseSuccessMessage = payload => dispatch({ type: 'setApiResponseSuccessMessage', payload })
    const setApiResponseErrorMessage = payload => dispatch({ type: 'setApiResponseErrorMessage', payload })
    const setApiResponseWarningMessage = payload => dispatch({ type: 'setApiResponseWarningMessage', payload })
    const setApiResponseCallbackFunction = payload => dispatch({ type: 'setApiResponseCallbackFunction', payload })
    const setIsLoading = payload => dispatch({ type: 'setIsLoading', payload })
    const setCart = payload => dispatch({ type: 'setCart', payload })
    const hideModal = () => {
        setShouldStoreModalAppear(false)
        dispatch({ type: 'resetStoreModalData' })
    }
    const borrow = () => {
        setIsLoading(true)
        axios.post('/borrowBook', {
            email,
            title,
            author,
            cover
        }).then(res => {
            setIsLoading(false)
            if (res.data.error) setApiResponseErrorMessage(res.data.errorMessage)
            if (res.data.warning) setApiResponseWarningMessage(res.data.warningMessage)
            if (res.data.success) setApiResponseSuccessMessage(res.data.successMessage)
            setApiResponseCallbackFunction(hideModal)
        }).catch(error => {
            if (error) {
                setIsLoading(false)
                setApiResponseErrorMessage('Something went wrong, try again by refreshing page!')
            }
        })
    }
    const buy = () => {
        let currentCart = [...cart]
        let newBook = {
            id: uuid(),
            title,
            author,
            price,
            cover
        }
        currentCart.unshift(newBook)
        setCart(currentCart)
        setApiResponseCallbackFunction(hideModal)
        setApiResponseSuccessMessage('Book has been added to the cart!')
    }
    return (
        <section className="storeModal fadeIn">
            <div className="storeModal__content">
                <figure className="storeModal__book">
                    <img className="storeModal__book-image" src={cover} alt={'Book' + title + ' written by ' + author} />
                </figure>
                <article className="storeModal__details">
                    <header className="storeModal__details-header">That's just a small step from getting this book:</header>
                    <div className="storeModal__details-wrapper">
                        <h3 className="storeModal__detail storeModal__book-author">Written by {author}</h3>
                        <h3 className="storeModal__detail storeModal__book-title">Named {title}</h3>
                        {price && <h3 className="storeModal__detail storeModal__book-price">That costs ${price}</h3>}
                    </div>
                    <div className="storeModal__choice">
                        {price ?
                            <header className="storeModal__choice-header" >I want to add this book to the cart</header> :
                            <header className="storeModal__choice-header" >I am sure I want this book</header>}
                        <div className="storeModal__choice-buttons">
                            <button className="storeModal__choice-button" onClick={price ? buy : borrow}>Yes</button>
                            <button className="storeModal__choice-button" onClick={hideModal}>No</button>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    )
}

export default StoreModal