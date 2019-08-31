import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import axios from 'axios'
import ApiResponseHandler from '../../../sharedComponents/Errors/ApiResponseHandler'

const ProfileModalButtonsWrapper = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const ProfileModalButtonsContent = styled.div`
    display: flex;
`;
const ProfileModalButton = styled.div`
    margin: 0px 15px;
    background: #333;
    padding: 10px 25px;
    color: white;
    font-size: 0.9rem;
    border-radius: 10px;
    cursor: pointer;
`;
const ProfileModalButtonsAnnotation = styled.div`
    text-align: center;
    margin-bottom: 30px;
    font-size: 1.1rem;
`;

const ProfileModalButtons = () => {
    const dispatch = useDispatch()
    const [responseMessageError, setResponseMessageError] = useState()
    const [responseMessageWarning, setResponseMessageWarning] = useState()
    const [responseMessageSuccess, setResponseMessageSuccess] = useState()
    const title = useSelector(state => state.global.profileModalData.title)
    const author = useSelector(state => state.global.profileModalData.author)
    const price = useSelector(state => state.global.profileModalData.price)
    const cover = useSelector(state => state.global.profileModalData.cover)
    const email = useSelector(state => state.global.userEmail)
    const cart = useSelector(state => state.global.cart)
    const hideModal = () => dispatch({ type: 'setShouldProfileModalAppear', payload: false })
    const showLoader = () => dispatch({ type: 'setIsLoading', payload: true })
    const hideLoader = () => dispatch({ type: 'setIsLoading', payload: false })
    const setCart = payload => dispatch({ type: 'setCart', payload })
    const borrowBook = () => {
        showLoader()
        axios.post('/borrowBook', {
            email,
            title,
            author,
            cover
        }).then(res => {
            hideLoader()
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
        <ProfileModalButtonsWrapper>
            {price ? <ProfileModalButtonsAnnotation>Add this book to a cart:</ProfileModalButtonsAnnotation>
                : <ProfileModalButtonsAnnotation>I am sure I want this book:</ProfileModalButtonsAnnotation>}
            <ProfileModalButtonsContent>
                {price ? <ProfileModalButton onClick={buyBook}>Yes</ProfileModalButton>
                    : <ProfileModalButton onClick={borrowBook}>Yes</ProfileModalButton>}
                <ProfileModalButton onClick={hideModal}>No</ProfileModalButton>
            </ProfileModalButtonsContent>
            {responseMessageError && <ApiResponseHandler error responseMessage={responseMessageError} onClick={hideApiResponseHandler} />}
            {responseMessageWarning && <ApiResponseHandler warning responseMessage={responseMessageWarning} onClick={hideApiResponseHandler} />}
            {responseMessageSuccess && <ApiResponseHandler success responseMessage={responseMessageSuccess} onClick={hideApiResponseHandler} />}
        </ProfileModalButtonsWrapper>
    )
}

export default ProfileModalButtons