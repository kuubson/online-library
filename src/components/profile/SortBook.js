import React from 'react';
import uuid from 'uuid'

export const sortBorrowedBooks = (books) => {
    const result = books.map(book => {
        return (
            <div className="borrowed-book-item relative" style={{ background: `url(data:image/jpeg;base64,${book.cover}) no-repeat center center`, backgroundSize: 'cover' }} key={uuid()}>
                <div className="borrowed-book-title book-title">{book.title}</div>
                <button className="borrowed-book-button book-button button absolute">Open</button>
            </div>
        )
    })
    return result;
}

export const sortBoughtBooks = (books) => {
    const result = books.map(book => {
        return (
            <div className="bought-book-item relative" style={{ background: `url(data:image/jpeg;base64,${book.cover}) no-repeat center center`, backgroundSize: 'cover' }} key={uuid()}>
                <div className="bought-book-title book-title">{book.title}</div>
                <button className="bought-book-button book-button button absolute">Open</button>
            </div>
        )
    })
    return result;
}