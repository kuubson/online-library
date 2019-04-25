import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { setCart } from '../../actions/cart'
import { sortSelectedBooks, setSummary, countTotal } from './SortBooks'

import Navbar from '../navbar/Navbar'
import NavbarLink from '../navbar/NavbarLink'

const Cart = (props) => {
    const [selectedBooks, setSelectedBooks] = useState("");
    const [summaryDetails, setSummaryDetails] = useState("");
    const [totalPrice, setTotalPrice] = useState("");
    useEffect(() => {
        supplyCart();
    }, [props.cart]);
    const supplyCart = () => {
        setSelectedBooks(sortSelectedBooks(props.cart, props.setCart));
        setSummaryDetails(setSummary(props.cart));
        setTotalPrice(countTotal(props.cart));
    }
    return (
        <div className="cart darkfullsize">
            <Navbar>
                <NavbarLink name="Home" where="/account" />
                <NavbarLink name="My profile" where="/profile" />
                <NavbarLink name="Logout" where="/logout" />
            </Navbar>
            <div className="summary books">
                <div className="selected-books-container books-container">
                    <div className="selected-books-header fullflex books-header">
                        <div className="selected-books-title books-title fullflex">Chosen books are here, ready to buy!</div>
                    </div>
                    <div className="selected-books-items books-items">
                        {selectedBooks}
                    </div>
                </div>
                <div className="summary-books-container books-container">
                    <div className="summary-books-header fullflex books-header">
                        <div className="summary-books-title books-title fullflex">Summary</div>
                    </div>
                    <div className="summary-books-items books-items">
                        {summaryDetails}
                    </div>
                    <div className="total fullflexcolumn">
                        <div className="total-price">
                            {'Total: ' + totalPrice + '$'}
                        </div>
                        <div className="paypal-button">
                            <button className="button">Pay</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCart: payload => dispatch(setCart(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
