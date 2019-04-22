import React, { Component } from 'react'

export class ShopCart extends Component {
    handleClick = (where) => {
        this.props.history.push(where)
    }
    render() {
        return (
            <div className="cart">
                <div className="navbar">
                    <ul className="navbar-logo-items">
                        <li className="navbar-logo-item">Online library</li>
                    </ul>
                    <ul className="navbar-links-items">
                        <li className="navbar-links-item"><div className="navbar-link" onClick={() => this.handleClick('/account')}>Home</div></li>
                        <li className="navbar-links-item"><div className="navbar-link" onClick={() => this.handleClick('/profile')}>My profile</div></li>
                        <li className="navbar-links-item"><div className="navbar-link" onClick={this.handleLogout}>Logout</div></li>
                    </ul>
                </div>
                <div className="box1">
                    <div className="boxik boxik1">
                        <div className="title">
                            Choosen books are here, ready to buy!
                        </div>
                        <div className="boks boks1">
                            <div className="book-title">Dance Step</div>
                            <div className="author">Daryl Dunn</div>
                            <button className="cancel">Cancel</button>
                            <div className="price">7.99$</div>
                        </div>
                    </div>
                    <div className="boxik boxik2">
                        <div className="title">
                            Summary
                        </div>
                        <div className="item">
                            <div className="title">Dance Step</div>
                            <div className="price">1x7.99$</div>
                        </div>
                        <div className="summary">
                            <div className="total">
                                Total: 99$
                            </div>
                            <button className="paypal">PayPal</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ShopCart
