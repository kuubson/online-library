import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import validator from 'validator'
import ApiResponseHandler from '../../sharedComponents/Errors/ApiResponseHandler'
import ValidationError from '../../sharedComponents/Errors/ValidationError'

const StoreFreeBooksHeaderInputWrapper = styled.div`
    flex: 1;
`;
const StoreFreeBooksHeaderInputContent = styled.input`
    flex: 0.8;
    font-size: 0.9rem;
    background: none;
    border: none;
    border-bottom: 2.5px solid white;
    color: white;
    padding: 9px 0px;
    text-indent: 5px;
    ::placeholder{
        color: white;
    }
`;
const StoreFreeBooksHeaderInputContentWrapper = styled.div`
    display:flex;
`;
const StoreFreeBooksHeaderInputButton = styled.div`
    background: white;
    padding: 0px 25px;
    display: flex;
    justify-content:center;
    align-items: center;
    cursor: pointer;
`;
const ValidationErrorWrapper = styled.div`
    margin-top: 10px;
`;

const StoreFreeBooksHeaderInput = props => {
    const dispatch = useDispatch()
    const [bookTitle, setBookTitle] = useState('')
    const [responseMessageError, setResponseMessageError] = useState()
    const [responseMessageWarning, setResponseMessageWarning] = useState()
    const [responseMessageSuccess, setResponseMessageSuccess] = useState()
    const [bookTitleError, setBookTitleError] = useState()
    const showLoader = () => dispatch({ type: 'setIsLoading', payload: true })
    const hideLoader = () => dispatch({ type: 'setIsLoading', payload: false })
    const handleOnChange = e => setBookTitle(e.target.value)
    const validate = () => {
        validator.isEmpty(bookTitle) ? setBookTitleError(`Give book's title!`) : setBookTitleError('')
        if (!validator.isEmpty(bookTitle)) {
            return true
        } else {
            return false
        }
    }
    const findBook = () => {
        if (validate()) {
            showLoader()
            axios.post('/findBook', {
                bookTitle
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
                    if (res.data.book.price) {
                        props.updatePaidBooks(res.data.book)
                    } else {
                        props.updateFreeBooks(res.data.book)
                    }
                }
            })
        }
    }
    const hideApiResponseHandler = () => {
        setResponseMessageError()
        setResponseMessageWarning()
        setResponseMessageSuccess()
    }
    return (
        <StoreFreeBooksHeaderInputWrapper>
            <StoreFreeBooksHeaderInputContentWrapper>
                <StoreFreeBooksHeaderInputContent type="text" placeholder="Type title of a book..." onChange={handleOnChange} />
                <StoreFreeBooksHeaderInputButton onClick={findBook}>Find</StoreFreeBooksHeaderInputButton>
                {responseMessageError && <ApiResponseHandler error responseMessage={responseMessageError} onClick={hideApiResponseHandler} />}
                {responseMessageWarning && <ApiResponseHandler warning responseMessage={responseMessageWarning} onClick={hideApiResponseHandler} />}
                {responseMessageSuccess && <ApiResponseHandler success responseMessage={responseMessageSuccess} onClick={hideApiResponseHandler} />}
            </StoreFreeBooksHeaderInputContentWrapper>
            {bookTitleError &&
                <ValidationErrorWrapper>
                    <ValidationError error={bookTitleError} />
                </ValidationErrorWrapper>}
        </StoreFreeBooksHeaderInputWrapper>
    )
}

export default StoreFreeBooksHeaderInput 