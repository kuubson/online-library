import React, { Component } from 'react'

import axios from 'axios'

export class Account extends Component {
    _isMounted = false;
    state = {
        booktitle: "",
        freebooks: [],
        paidbooks: []
    }
    componentDidMount() {
        this._isMounted = true;
        !sessionStorage.getItem('jwt') && this.props.history.push('/login');
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    handleLogout = () => {
        sessionStorage.clear();
        this.props.history.push('/');
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleFind = async (e) => {
        e.preventDefault();
        if (this._isMounted) {
            const gettingBooksProcess = await axios.post('/getBooks', {
                booktitle: this.state.booktitle
            });
            const book = gettingBooksProcess.data.book;
            const imageUrl = btoa(new Uint8Array(book.cover.data.data).reduce(function (data, byte) {
                return data + String.fromCharCode(byte);
            }, ''));
            if ('price' in book) {
                function paidbook() {
                    return (
                        <div className="book" style={{ background: `url(data:image/jpeg;base64,${imageUrl}) no-repeat center center`, backgroundSize: 'cover' }}>
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
                function freebook() {
                    return (
                        <div className="book" style={{ background: `url(data:image/jpeg;base64,${imageUrl}) no-repeat center center`, backgroundSize: 'cover' }}>
                            <h4 className="title">{freebook.title}</h4>
                            <button className="borrow-button">Borrow</button>
                        </div>
                    )
                }
                this.setState({
                    freebooks: [...this.state.freebooks, freebook()]
                })
            }
        }
    }
    render() {
        return (
            <div className="account">
                <div className="account-item navbar">
                    <ul className="navbar-logo-items">
                        <li className="navbar-logo-item">Online library</li>
                    </ul>
                    <ul className="navbar-links-items">
                        <li className="navbar-links-item"><a href="#" className="navbar-link">My profile</a></li>
                        <li className="navbar-links-item"><a href="#" className="navbar-link" onClick={this.handleLogout}>Logout</a></li>
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