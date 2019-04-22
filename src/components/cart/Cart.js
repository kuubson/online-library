import React, { Component } from 'react'

import { connect } from 'react-redux'
import { setCart } from '../../actions/user'
export class Cart extends Component {
    state = {
        chosen: "",
        summary: "",
        total: ""
    }
    componentDidMount() {

        console.log(this.props.cart);

        let total = 0;

        const chosen = this.props.cart.map(item => {
            return (
                <div className="chosen-book" style={{ background: `url(data:image/jpeg;base64,${item.cover}) no-repeat center center`, backgroundSize: 'cover' }} key={item.id}>
                    <div className="chosen-book-title">{item.title}</div>
                    <div className="chosen-book-author">{item.author}</div>
                    <button className="cancel" onClick={() => this.handleCancel(item.id, item.price)}>Cancel</button>
                    <div className="chosen-book-price">{item.price}</div>
                </div>
            )
        })

        const summary = this.props.cart.map(item => {
            total += item.price;
            return (
                <div className="chosen-book-details" key={item.id}>
                    <div className="chosen-book-detail-title">{item.title}</div>
                    <div className="chosen-book-detail-price">{'1x' + item.price}</div>
                </div>
            )
        })

        this.setState({
            chosen,
            summary,
            total: parseFloat(total).toFixed(2)
        }, () => {
            console.log(this.state.chosen);
        })

    }
    handleCancel = (id, price) => {
        const updatedChosen = this.state.chosen.filter(item => {
            return item.key !== id
        })
        const updatedSummary = this.state.summary.filter(item => {
            return item.key !== id
        })
        const updatedCart = this.props.cart.filter(item => {
            return item.id !== id
        })
        this.props.setCart(updatedCart);
        console.log(updatedCart);
        let tempTotal = this.state.total;
        const total = parseFloat(tempTotal - price).toFixed(2);
        this.setState({
            chosen: updatedChosen,
            summary: updatedSummary,
            total
        })
    }
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
                <div className="summary">
                    <div className="chosen-books">
                        <div className="header-title">
                            Chosen books are here, ready to buy!
                        </div>
                        {this.state.chosen}
                    </div>
                    <div className="chosen-books-summary">
                        <div className="header-title">
                            Summary
                        </div>
                        {this.state.summary}
                        <div className="summary-total">
                            <div className="total-price">
                                {"Total " + this.state.total + "$"}
                            </div>
                            <button className="paypal">PayPal</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.user.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCart: payload => dispatch(setCart(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
