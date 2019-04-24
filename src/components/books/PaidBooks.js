import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { setTitle, setAuthor, setPrice, setCover, setPaidBooks, setFreeBooks } from '../../actions/book'
import { sortPaidBooks } from './SortBooks'
import { connect } from 'react-redux'

const PaidBooks = (props) => {
    let _isMounted = false;
    const [paidBooks, setPaidBooks] = useState();
    useEffect(() => {
        _isMounted = true;
        const getBooks = async () => {
            if (props.paidBooks.length === 0) {
                const getPaidBooks = await axios.get('/getPaidBooks');
                props.setPaidBooks(getPaidBooks.data.books);
                setPaidBooks(sortPaidBooks(getPaidBooks.data.books, props.setTitle, props.setAuthor, props.setPrice, props.setCover));
            } else {
                setPaidBooks(sortPaidBooks(props.paidBooks, props.setTitle, props.setAuthor, props.setPrice, props.setCover));
            }
        }
        if (_isMounted) {
            getBooks();
        }
        return () => {
            _isMounted = false;
        }
    }, [])
    return (
        <div className="paid-books-container books-container">
            <div className="paid-books-header books-header fullflex">
                <div className="paid-books-title books-title">Buy premium books!</div>
            </div>
            <div className="paid-books-items books-items">
                {paidBooks}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        paidBooks: state.book.paidBooks,
        freeBooks: state.book.freeBooks
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPaidBooks: payload => dispatch(setPaidBooks(payload)),
        setFreeBooks: payload => dispatch(setFreeBooks(payload)),
        setTitle: payload => dispatch(setTitle(payload)),
        setAuthor: payload => dispatch(setAuthor(payload)),
        setPrice: payload => dispatch(setPrice(payload)),
        setCover: payload => dispatch(setCover(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaidBooks)
