import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { setTitle, setAuthor, setCover } from '../../actions/book'
import { connect } from 'react-redux'
import $ from 'jquery'

const FreeBooks = (props) => {
    let _isMounted = false;
    const [books, setBooks] = useState();
    useEffect(() => {
        _isMounted = true;
        const getBooks = async () => {
            const result = await axios.get('/getFreeBooks');
            const response = result.data;
            const books = response.books.map(book => {
                const imageUrl = btoa(new Uint8Array(book.cover.data.data).reduce(function (data, byte) {
                    return data + String.fromCharCode(byte);
                }, ''));
                return (
                    <div className="free-book-item relative" style={{ background: `url(data:image/jpeg;base64,${imageUrl}) no-repeat center center`, backgroundSize: 'cover' }} key={book._id}>
                        <div className="free-book-title book-title">{book.title}</div>
                        <button className="free-book-button book-button button absolute" onClick={() => {
                            props.setTitle(book.title);
                            props.setAuthor(book.author);
                            props.setCover(imageUrl);
                            $('.modal').css('display', 'block');
                        }}>Borrow</button>
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
        <div className="free-books-container books-container">
            <div className="free-books-header books-header">
                <div className="free-books-title books-title fullflex">Find here awesome books!</div>
                <div className="free-books-search fullflex">
                    <input className="free-books-search-input input" id="book-title" name="book-title" type="text" placeholder="Type title of book..." />
                    <button className="free-books-search-button button">Find</button>
                </div>
            </div>
            <div className="free-books-items books-items">
                {books}
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setTitle: payload => dispatch(setTitle(payload)),
        setAuthor: payload => dispatch(setAuthor(payload)),
        setCover: payload => dispatch(setCover(payload)),
    }
}

export default connect(null, mapDispatchToProps)(FreeBooks)
