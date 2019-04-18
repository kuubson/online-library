import React, { Component } from 'react'

import axios from 'axios'
import uuid from 'uuid'
import { accountAnimations } from '../../animations/AccountAnimations'
import $ from 'jquery'
import anime from 'animejs'

export class Account extends Component {
    _isMounted = false;
    state = {
        booktitle: "",
        freebooks: [],
        paidbooks: [],
        modalBookTitle: "",
        modalBookAuthor: "",
        errorMessage: ""
    }
    async componentDidMount() {

        this._isMounted = true;
        !sessionStorage.getItem('jwt') && this.props.history.push('/login');

        if (this._isMounted) {
            const gettingBooksProcess = await axios.post('/getBooks');
            const books = gettingBooksProcess.data.books;
            books.map(book => {
                const imageUrl = btoa(new Uint8Array(book.cover.data.data).reduce(function (data, byte) {
                    return data + String.fromCharCode(byte);
                }, ''));
                book.coverUrl = imageUrl;
                if ('price' in book) {
                    const paidbook = () => {
                        return (
                            <div className="book" style={{ background: `url(data:image/jpeg;base64,${imageUrl}) no-repeat center center`, backgroundSize: 'cover' }} key={uuid()}>
                                <h4 className="title">{book.title}</h4>
                                <div className="buy-details">
                                    <h4 className="price">{book.price + "$"}</h4>
                                    <button className="buy-button">Buy</button>
                                </div>
                            </div>
                        )
                    }
                    this.setState({
                        paidbooks: [...this.state.paidbooks, paidbook()]
                    })
                } else {
                    const freebook = () => {
                        return (
                            <div className="book" style={{ background: `url(data:image/jpeg;base64,${imageUrl}) no-repeat center center`, backgroundSize: 'cover' }} key={uuid()}>
                                <h4 className="title">{book.title}</h4>
                                <button className="checkout-button" onClick={() => this.handleCheckOutModal(book.title, book.author, book.coverUrl)}>Check out</button>
                            </div>
                        )
                    }
                    this.setState({
                        freebooks: [...this.state.freebooks, freebook()]
                    })
                }
                return null;
            })
        }

        accountAnimations();

    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    handleLogout = () => {
        sessionStorage.clear();
        this.props.history.push('/');
    }
    handleCheckOutModal = (bookTitle, bookAuthor, bookCover) => {
        this.setState({
            modalBookTitle: bookTitle,
            modalBookAuthor: bookAuthor,
        })
        $('.modal').css('display', 'block');
        anime({
            targets: '.modal',
            scale: [2, 1],
            easing: 'easeOutElastic(1, 2)'
        });
    }
    handleCancelModal = () => {
        $('.modal').css('display', 'none');
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleFind = async (e) => {
        e.preventDefault();
        if (this._isMounted) {
            if (this.state.booktitle !== "") {
                const gettingBooksProcess = await axios.post('/getBook', {
                    booktitle: this.state.booktitle
                });
                const book = gettingBooksProcess.data.book;
                if (gettingBooksProcess.data.done) {
                    this.setState({
                        errorMessage: "",
                    })
                    const imageUrl = btoa(new Uint8Array(book.cover.data.data).reduce(function (data, byte) {
                        return data + String.fromCharCode(byte);
                    }, ''));
                    if ('price' in book) {
                        const paidbook = () => {
                            return (
                                <div className="book" style={{ background: `url(data:image/jpeg;base64,${imageUrl}) no-repeat center center`, backgroundSize: 'cover' }} key={uuid()}>
                                    <h4 className="title">{book.title}</h4>
                                    <div className="buy-details">
                                        <h4 className="price">{book.price + "$"}</h4>
                                        <button className="buy-button">Buy</button>
                                    </div>
                                </div>
                            )
                        }
                        const updatedPaidBooks = [paidbook(), ...this.state.paidbooks];
                        updatedPaidBooks.pop();
                        this.setState({
                            paidbooks: updatedPaidBooks
                        })
                    } else {
                        const freebook = () => {
                            return (
                                <div className="book" style={{ background: `url(data:image/jpeg;base64,${imageUrl}) no-repeat center center`, backgroundSize: 'cover' }} key={uuid()}>
                                    <h4 className="title">{book.title}</h4>
                                    <button className="checkout-button" onClick={() => this.handleCheckOutModal(book.title, book.author, book.coverUrl)}>Check out</button>
                                </div>
                            )
                        }
                        const updatedFreeBooks = [freebook(), ...this.state.freebooks];
                        updatedFreeBooks.pop();
                        this.setState({
                            freebooks: updatedFreeBooks
                        })
                    }
                } else {
                    this.setState({
                        errorMessage: gettingBooksProcess.data.msg
                    })
                }
            } else {
                this.setState({
                    errorMessage: "You have to type book's title!"
                })
            }
        }
    }
    render() {
        return (
            <div className="account">
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={this.handleCancelModal}>&times;</span>
                        {this.state.modalBookTitle}
                        {this.state.modalBookAuthor}
                    </div>
                </div>
                <div className="account-item navbar">
                    <ul className="navbar-logo-items">
                        <li className="navbar-logo-item">Online library</li>
                    </ul>
                    <ul className="navbar-links-items">
                        <li className="navbar-links-item"><a href="#templink" className="navbar-link">My profile</a></li>
                        <li className="navbar-links-item"><a href="#templink" className="navbar-link" onClick={this.handleLogout}>Logout</a></li>
                    </ul>
                </div>
                <div className="account-item buy-book">
                    <div className="buy-book-title">
                        <h1>Buy premium books!</h1>
                    </div>
                    <div className="buy-books-container">
                        {this.state.paidbooks}
                    </div>
                </div>
                <div className="account-item find-book">
                    <div className="find-book-title">
                        <h1>Find here awesome books!</h1>
                    </div>
                    <div className="find-field">
                        <form className="find-form" onSubmit={this.handleFind}>
                            <input className="find-book-input" name="booktitle" type="text" placeholder="Type title of book..." onChange={this.handleChange} />
                            <button className="find-button">Find</button>
                        </form>
                        <div className="find-error">
                            {this.state.errorMessage !== "" && <div className="error">{this.state.errorMessage}</div>}
                        </div>
                    </div>
                </div>
                <div className="account-item books">
                    <div className="find-books-container">
                        {this.state.freebooks}
                    </div>
                </div>
            </div>
        )
    }
}

export default Account