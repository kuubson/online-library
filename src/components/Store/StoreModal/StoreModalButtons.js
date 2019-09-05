import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import axios from 'axios'
import uuid from 'uuid'

import ApiResponseHandler from '../../../sharedComponents/Errors/ApiResponseHandler'

const StoreModalButtonsWrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    @media (max-width: 900px) {
        padding: 30px 0px;
    }
`;
const StoreModalButtonsContent = styled.div`
    display: flex;
`;
const StoreModalButton = styled.div`
    margin: 0px 15px;
    background: #333;
    padding: 10px 25px;
    color: white;
    font-size: 0.9rem;
    border-radius: 10px;
    cursor: pointer;
    @media (max-width: 900px) {
        font-size: 0.7rem;
        padding: 6px 20px;
    }
`;
const StoreModalButtonsAnnotation = styled.div`
    text-align: center;
    margin-bottom: 30px;
    font-size: 1.1rem;
    @media (max-width: 900px) {
        font-size: 0.9rem;
        margin-bottom: 25px;
    }
`;

const StoreModalButtons = () => {
    const dispatch = useDispatch()
    const [responseMessageError, setResponseMessageError] = useState()
    const [responseMessageWarning, setResponseMessageWarning] = useState()
    const [responseMessageSuccess, setResponseMessageSuccess] = useState()
    const title = useSelector(state => state.global.storeModalData.title)
    const author = useSelector(state => state.global.storeModalData.author)
    const price = useSelector(state => state.global.storeModalData.price)
    const cover = useSelector(state => state.global.storeModalData.cover)
    const email = useSelector(state => state.global.userEmail)
    const cart = useSelector(state => state.global.cart)
    const hideModal = () => dispatch({ type: 'setShouldStoreModalAppear', payload: false })
    const setIsLoading = payload => dispatch({ type: 'setIsLoading', payload })
    const setCart = payload => dispatch({ type: 'setCart', payload })
    const borrowBook = () => {
        setIsLoading(true)
        axios.post('/borrowBook', {
            email,
            title,
            author,
            cover
        }).then(res => {
            setIsLoading(false)
            if (res.data.error) {
                setResponseMessageError(res.data.errorMessage)
            }
            if (res.data.warning) {
                setResponseMessageWarning(res.data.warningMessage)
            }
            if (res.data.success) {
                setResponseMessageSuccess(res.data.successMessage)
            }
        })
    }
    const buyBook = () => {
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
        setResponseMessageSuccess('Book has been added to the cart!')
    }
    const hideApiResponseHandler = () => {
        hideModal()
        setResponseMessageError()
        setResponseMessageWarning()
        setResponseMessageSuccess()
    }
    return (
        <StoreModalButtonsWrapper>
            {price ? <StoreModalButtonsAnnotation>Add this book to a cart:</StoreModalButtonsAnnotation>
                : <StoreModalButtonsAnnotation>I am sure I want this book:</StoreModalButtonsAnnotation>}
            <StoreModalButtonsContent>
                {price ? <StoreModalButton onClick={buyBook}>Yes</StoreModalButton>
                    : <StoreModalButton onClick={borrowBook}>Yes</StoreModalButton>}
                <StoreModalButton onClick={hideModal}>No</StoreModalButton>
            </StoreModalButtonsContent>
            {responseMessageError && <ApiResponseHandler error responseMessage={responseMessageError} onClick={hideApiResponseHandler} />}
            {responseMessageWarning && <ApiResponseHandler warning responseMessage={responseMessageWarning} onClick={hideApiResponseHandler} />}
            {responseMessageSuccess && <ApiResponseHandler success responseMessage={responseMessageSuccess} onClick={hideApiResponseHandler} />}
        </StoreModalButtonsWrapper>
    )
}

export default StoreModalButtons