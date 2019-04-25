import React from 'react';
import uuid from 'uuid'

const cancel = (id, books, updateCart) => {
    const updatedCart = books.filter(book => {
        return book.id !== id
    })
    updateCart(updatedCart);
}

export const sortSelectedBooks = (books, updateCart) => {
    const result = books.map(book => {
        return (
            <div className="selected-book-item relative" style={{ background: `url(data:image/jpeg;base64,${book.cover}) no-repeat center center`, backgroundSize: 'cover' }} key={uuid()}>
                <div className="selected-book-title book-title">{book.title}</div>
                <div className="selected-book-price book-price">{book.price + "$"}</div>
                <button className="selected-book-button book-button button absolute" onClick={() => cancel(book.id, books, updateCart)}>Cancel</button>
            </div>
        )
    })
    return result;
}

export const setSummary = (books) => {
    const result = books.map(book => {
        return (
            <div className="summary-book-item fullflex" key={uuid()}>
                <div className="summary-book-title summary-book-title">{book.title}</div>
                <div className="summary-book-title summary-book-price">{'1x' + book.price + '$'}</div>
            </div>
        )
    })
    return result;
}

export const countTotal = (books) => {
    let total = 0;
    books.forEach(book => {
        total += book.price;
    })
    return parseFloat(total).toFixed(2);
}