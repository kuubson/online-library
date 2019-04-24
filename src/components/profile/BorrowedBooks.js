import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { connect } from 'react-redux'
import { setBorrowedBooks } from '../../actions/book'
import { sortBorrowedBooks } from './SortBook'

const BorrowedBooks = (props) => {
    useEffect(() => {
        getBooks();
    }, [])
    const [savedBorrowedBooks, setSavedBorrowedBooks] = useState("");
    const getBooks = () => {
        if (props.borrowedBooks.length === 0) {
            axios.post('/getBorrowedBooks', {
                email: props.email
            }).then(result => {
                const done = result.data.done;
                const message = result.data.msg;
                const borrowedBooks = result.data.borrowedBooks;
                if (done) {
                    props.setBorrowedBooks(borrowedBooks);
                    setSavedBorrowedBooks(sortBorrowedBooks(borrowedBooks));
                } else {
                    console.log(message);
                }
            })
        } else {
            setSavedBorrowedBooks(sortBorrowedBooks(props.borrowedBooks));
        }
    }
    return (
        <div className="borrowed-books-container books-container profile-container">
            <div className="borrowed-books-header books-header fullflex">
                <div className="borrowed-books-title books-title">Enjoy reading your free books!</div>
            </div>
            <div className="borrowed-books-items books-items">
                {savedBorrowedBooks}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        email: state.user.email,
        borrowedBooks: state.book.borrowedBooks
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setBorrowedBooks: payload => dispatch(setBorrowedBooks(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BorrowedBooks)
