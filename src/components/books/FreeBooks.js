import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { setTitle, setAuthor, setCover, setFreeBooks, setPaidBooks } from '../../actions/book'
import { connect } from 'react-redux'
import { sortFreeBooks } from './SortBooks'

const FreeBooks = (props) => {
    let _isMounted = false;
    const [freeBooks, setFreeBooks] = useState();
    const [title, setTitle] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    useEffect(() => {
        _isMounted = true;
        return () => {
            _isMounted = false;
        };
    })
    useEffect(() => {
        const getBooks = async () => {
            if (props.freeBooks.length === 0) {
                const getFreeBooks = await axios.get('/getFreeBooks');
                props.setFreeBooks(getFreeBooks.data.books);
                setFreeBooks(sortFreeBooks(getFreeBooks.data.books, props.setTitle, props.setAuthor, props.setCover));
            } else {
                setFreeBooks(sortFreeBooks(props.freeBooks, props.setTitle, props.setAuthor, props.setCover));
            }
        }
        if (_isMounted) {
            getBooks();
        }
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title.length !== 0) {
            const findNewBook = await axios.post('/findNewBook', {
                title
            });
            if (findNewBook.data.done) {
                const book = findNewBook.data.book;
                const currentFreeBooks = props.freeBooks;
                const currentPaidBooks = props.paidBooks;
                if (book.price) {
                    currentPaidBooks.unshift(book);
                    props.setPaidBooks(currentPaidBooks);

                } else {
                    currentFreeBooks.unshift(book);
                    props.setFreeBooks(currentFreeBooks);
                    setFreeBooks(sortFreeBooks(props.freeBooks, props.setTitle, props.setAuthor, props.setCover));
                }
            } else {
                setErrorMessage(findNewBook.data.msg)
            }
        } else {
            setErrorMessage("You have to type book's title!");
        }
    }
    return (
        <div className="free-books-container books-container">
            <div className="free-books-header books-header">
                <div className="free-books-title books-title fullflex">Find here awesome books!</div>
                <form className="free-books-search fullflex" onSubmit={handleSubmit}>
                    <input className="free-books-search-input input" id="book-title" name="book-title" type="text" placeholder="Type title of book..." onChange={e => setTitle(e.target.value)} />
                    <button className="free-books-search-button button">Find</button>
                </form>
                {successMessage && <div className="success">{successMessage}</div>}
                {errorMessage && <div className="error">{errorMessage}</div>}
            </div>
            <div className="free-books-items books-items">
                {freeBooks}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        freeBooks: state.book.freeBooks,
        paidBooks: state.book.paidBooks
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPaidBooks: payload => dispatch(setPaidBooks(payload)),
        setFreeBooks: payload => dispatch(setFreeBooks(payload)),
        setTitle: payload => dispatch(setTitle(payload)),
        setAuthor: payload => dispatch(setAuthor(payload)),
        setCover: payload => dispatch(setCover(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FreeBooks)
