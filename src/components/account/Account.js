import React, { Component } from 'react'

export class Account extends Component {
    componentDidMount() {
        !sessionStorage.getItem('jwt') && this.props.history.push('/login');
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
                        <li className="navbar-links-item"><a href="#" className="navbar-link">Logout</a></li>
                    </ul>
                </div>
                <div className="account-item buy-book">
                    <div className="buy-book-title">
                        <h1>Buy awesome premium books!</h1>
                    </div>
                    <div className="books"></div>
                </div>
                <div className="account-item socials">
                    <div className="social"><i className="icon-facebook fb"></i></div>
                    <div className="social"><i className="icon-instagram ig"></i></div>
                    <div className="social"><i className="icon-twitter tw"></i></div>
                    <div className="social"><i className="icon-youtube-play yt"></i></div>
                </div>
                <div className="account-item find-book">
                    <div className="find-book-title">
                        <h1>Find here awesome books!</h1>
                    </div>
                    <div className="find-field">
                        <input className="find-book-input" name="book" type="text" placeholder="Type title of book" />
                        <button className="find-button">Find</button>
                    </div>
                </div>
                <div className="account-item books">
                    <div className="books-container">
                        <div className="book crimix">
                            <h4 className="title">Crimix</h4>
                            <button className="borrow-button">Borrow</button>
                        </div>
                        <div className="book wayup">
                            <h4 className="title">Way Up</h4>
                            <button className="borrow-button">Borrow</button>
                        </div>
                        <div className="book nothingimpossible">
                            <h4 className="title">Nothing Impossible</h4>
                            <button className="borrow-button">Borrow</button>
                        </div>
                        <div className="book dancestep">
                            <h4 className="title">Dance Step</h4>
                            <button className="borrow-button">Borrow</button>
                        </div>
                        <div className="book armynation">
                            <h4 className="title">Army Nation</h4>
                            <button className="borrow-button">Borrow</button>
                        </div>
                        <div className="book aroundtheworld">
                            <h4 className="title">Arount The World</h4>
                            <button className="borrow-button">Borrow</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Account
