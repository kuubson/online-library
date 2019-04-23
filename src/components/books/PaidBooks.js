import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { setTitle, setAuthor, setPrice, setCover } from '../../actions/book'
import { connect } from 'react-redux'
import $ from 'jquery'

const PaidBooks = (props) => {
    let _isMounted = false;
    const [books, setBooks] = useState();
    useEffect(() => {
        _isMounted = true;
        const getBooks = async () => {
            const result = await axios.get('/getPaidBooks');
            const response = result.data;
            const books = response.books.map(book => {
                const imageUrl = btoa(new Uint8Array(book.cover.data.data).reduce(function (data, byte) {
                    return data + String.fromCharCode(byte);
                }, ''));
                return (
                    <div className="paid-books-item relative" style={{ background: `url(data:image/jpeg;base64,${imageUrl}) no-repeat center center`, backgroundSize: 'cover' }} key={book._id}>
                        <div className="paid-book-title book-title">{book.title}</div>
                        <div className="paid-book-price book-price">{book.price + "$"}</div>
                        <button className="paid-book-button book-button button absolute" onClick={() => {
                            props.setTitle(book.title);
                            props.setAuthor(book.author);
                            props.setPrice(book.price);
                            props.setCover(imageUrl);
                            $('.modal').css('display', 'block');
                        }}>Buy</button>
                    </div>
                )
            })
            setBooks(books);
        }
        if (_isMounted) {
            getBooks();
        }
        return () => {
            _isMounted = false;
        }
    })
    return (
        <div className="paid-books-container books-container">
            <div className="paid-books-header books-header fullflex">
                <div className="paid-books-title books-title">Buy premium books!</div>
            </div>
            <div className="paid-books-items books-items">
                {books}
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTitle: payload => dispatch(setTitle(payload)),
        setAuthor: payload => dispatch(setAuthor(payload)),
        setPrice: payload => dispatch(setPrice(payload)),
        setCover: payload => dispatch(setCover(payload))
    }
}

export default connect(null, mapDispatchToProps)(PaidBooks)
