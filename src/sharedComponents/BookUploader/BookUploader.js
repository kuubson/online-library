import React, { useState, useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled, { css, keyframes } from 'styled-components'
import axios from 'axios'
import validator from 'validator'

import BookUploaderTitle from './BookUploaderTitle'
import BookUploaderInput from './BookUploaderInput'
import BookUploaderFileInput from './BookUploaderFileInput'
import BookUploaderButton from './BookUploaderButton'
import BookUploaderCloseButton from './BookUploaderCloseButton'
import Loader from '../Loader/Loader'
import ValidationError from '../Errors/ValidationError'
import ApiResponseHandler from '../Errors/ApiResponseHandler'

const fadeIn = keyframes`
    from{
        opacity: 0
    }
    to{
        opacity:1
    }
`;

const BookUploaderWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0,0,0,0.8);
    opacity: 0;
    z-index: 4;
    ${props => {
        if (props.shouldFadeIn) {
            return css`
                animation: ${fadeIn} 0.5s ease-in-out both;
            `
        }
    }}
`;
const BookUploaderContent = styled.div`
    width: 80%;
    height: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`;
const BookUploaderInputsWrapper = styled.div`

`;

const BookUploader = props => {
    const [bookTitle, setBookTitle] = useState('')
    const [bookAuthor, setBookAuthor] = useState('')
    const [bookCover, setBookCover] = useState()
    const [bookTitleError, setBookTitleError] = useState()
    const [bookAuthorError, setBookAuthorError] = useState()
    const [bookCoverError, setBookCoverError] = useState()
    const [shouldFadeIn, setShouldFadeIn] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [responseMessageError, setResponseMessageError] = useState()
    const [responseMessageWarning, setResponseMessageWarning] = useState()
    const [responseMessageSuccess, setResponseMessageSuccess] = useState()
    useLayoutEffect(() => {
        setShouldFadeIn(true)
    }, [])
    const dispatch = useDispatch()
    const hideBookUploader = () => dispatch({ type: 'setShouldBookUploaderAppear', payload: false })
    const validate = () => {
        validator.isEmpty(bookTitle) ? setBookTitleError('You have to name your book!') : setBookTitleError('')
        validator.isEmpty(bookAuthor) ? setBookAuthorError('Become famous by giving at least your name :)') : setBookAuthorError('')
        !bookCover ? setBookCoverError(`Upload book's cover!`) : setBookCoverError('')
        if (!validator.isEmpty(bookTitle) && !validator.isEmpty(bookAuthor) && bookCover) {
            return true
        } else {
            return false
        }
    }
    const upload = () => {
        if (validate()) {
            setIsLoading(true)
            const book = new FormData();
            book.append('bookTitle', bookTitle)
            book.append('bookAuthor', bookAuthor)
            book.append('bookCover', bookCover)
            axios.post('/uploadBook', book).then(res => {
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
    }
    const hideApiResponseHandler = () => {
        setResponseMessageError()
        setResponseMessageWarning()
        setResponseMessageSuccess()
    }
    return (
        <BookUploaderWrapper shouldFadeIn={shouldFadeIn}>
            <BookUploaderContent>
                <BookUploaderCloseButton onClick={hideBookUploader} />
                <BookUploaderTitle />
                <BookUploaderInputsWrapper>
                    <BookUploaderInput placeholder="Type book's title..." label="Book's title" onChange={setBookTitle} />
                    {bookTitleError && <ValidationError error={bookTitleError} />}
                    <BookUploaderInput placeholder="Type your name and surname..." label="Book's author" onChange={setBookAuthor} />
                    {bookAuthorError && <ValidationError error={bookAuthorError} />}
                    <BookUploaderFileInput onChange={setBookCover} />
                    {bookCoverError && <ValidationError error={bookCoverError} />}
                </BookUploaderInputsWrapper>
                <BookUploaderButton onClick={upload} />
            </BookUploaderContent>
            {isLoading && <Loader />}
            {responseMessageError && <ApiResponseHandler error responseMessage={responseMessageError} onClick={hideApiResponseHandler} />}
            {responseMessageWarning && <ApiResponseHandler warning responseMessage={responseMessageWarning} onClick={hideApiResponseHandler} />}
            {responseMessageSuccess && <ApiResponseHandler success responseMessage={responseMessageSuccess} onClick={hideApiResponseHandler} />}
        </BookUploaderWrapper>
    )
}

export default BookUploader