
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { connect } from 'react-redux'
import { setBoughtBooks } from '../../actions/book'
import { sortBoughtBooks } from './SortBook'

const BoughtBooks = (props) => {
    useEffect(() => {
        getBooks();
    }, [])
    const [savedBoughtBooks, setSavedBoughtBooks] = useState("");
    const getBooks = () => {
        axios.post('/getBoughtBooks', {
            email: props.email
        }).then(result => {
            const done = result.data.done;
            const message = result.data.msg;
            const boughtBooks = result.data.boughtBooks;
            if (done) {
                props.setBoughtBooks(boughtBooks);
                setSavedBoughtBooks(sortBoughtBooks(boughtBooks));
            } else {
                console.log(message);
            }
        })
    }
    return (
        <div className="bought-books-container books-container profile-container">
            <div className="bought-books-header books-header fullflex">
                <div className="bought-books-title books-title ">Bought premium books are there here!</div>
            </div>
            <div className="bought-books-items books-items">
                {savedBoughtBooks}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        email: state.user.email,
        boughtBooks: state.book.boughtBooks
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setBoughtBooks: payload => dispatch(setBoughtBooks(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoughtBooks)
