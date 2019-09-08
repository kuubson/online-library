import React, { useState } from 'react'
import validator from 'validator'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const BookUploader = () => {
    const [bookTitle, setBookTitle] = useState('')
    const [bookAuthor, setBookAuthor] = useState('')
    const [bookCover, setBookCover] = useState()
    const [fileName, setFileName] = useState()
    const [bookTitleError, setBookTitleError] = useState()
    const [bookAuthorError, setBookAuthorError] = useState()
    const [bookCoverError, setBookCoverError] = useState()

    const dispatch = useDispatch()
    const setIsLoading = payload => dispatch({ type: 'setIsLoading', payload })
    const setApiResponseSuccessMessage = payload => dispatch({ type: 'setApiResponseSuccessMessage', payload })
    const setApiResponseErrorMessage = payload => dispatch({ type: 'setApiResponseErrorMessage', payload })
    const setApiResponseWarningMessage = payload => dispatch({ type: 'setApiResponseWarningMessage', payload })
    const setShouldBookUploaderAppear = payload => dispatch({ type: 'setShouldBookUploaderAppear', payload })

    const hideBookUploader = () => setShouldBookUploaderAppear(false)
    const handleFileChange = e => {
        if (e.target.files[0]) {
            setBookCover(e.target.files[0])
            setFileName(e.target.files[0].name)
        }
    }
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
    const handleClick = e => {
        e.preventDefault()
        if (validate()) {
            setIsLoading(true)
            const book = new FormData();
            book.append('bookTitle', bookTitle)
            book.append('bookAuthor', bookAuthor)
            book.append('bookCover', bookCover)
            axios.post('/uploadBook', book).then(res => {
                setIsLoading(false)
                if (res.data.error) setApiResponseErrorMessage(res.data.errorMessage)
                if (res.data.warning) setApiResponseWarningMessage(res.data.warningMessage)
                if (res.data.success) setApiResponseSuccessMessage(res.data.successMessage)
            })
        }
    }
    return (
        <section className="bookUploader fadeIn">
            <div className="bookUploader__content">
                <div className="bookUploader__close" onClick={hideBookUploader}>✕</div>
                <header className="bookUploader__header">Upload your own book to the store!</header>
                <form className="inputs inputs--black">
                    <div className="inputs__input-wrapper">
                        <label className="inputs__input-label inputs__input-label--black" htmlFor="title">Book's title</label>
                        <input id="title" className="inputs__input inputs__input--black" name="title" type="text" placeholder="Type book's title..." value={bookTitle} onChange={e => setBookTitle(e.target.value)} />
                        {bookTitleError && <p className="inputs__input-error">{bookTitleError}</p>}
                    </div>
                    <div className="inputs__input-wrapper">
                        <label className="inputs__input-label inputs__input-label--black" htmlFor="author">Book's author</label>
                        <input id="author" className="inputs__input inputs__input--black" name="author" type="text" placeholder="Type your name and surname..." value={bookAuthor} onChange={e => setBookAuthor(e.target.value)} />
                        {bookAuthorError && <p className="inputs__input-error">{bookAuthorError}</p>}
                    </div>
                    <div className="inputs__input-wrapper inputs__input-wrapper--cover">
                        <label className="bookUploader__file-label" htmlFor="cover">{fileName ? fileName : `Choose an image for book's cover...`}</label>
                        <input id="cover" className="bookUploader__file-input" name="cover" type="file" placeholder="Type your name and surname..." onChange={e => handleFileChange(e)} />
                        {bookCoverError && <p className="inputs__input-error">{bookCoverError}</p>}
                    </div>
                </form>
                <button className="inputs__input-button inputs__input-button--black" onClick={handleClick}>Upload</button>
            </div>
        </section>
    )
}

export default BookUploader