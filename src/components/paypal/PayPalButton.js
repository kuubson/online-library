import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from 'react-paypal-express-checkout';
import { setCart } from '../../actions/cart'
import axios from 'axios'
import $ from 'jquery'

const PayPalButton = (props) => {
    const onSuccess = (payment) => {
        console.log("The payment was succeeded!", payment);
        $('.paymentProgress').css('display', 'flex');
        axios.post('/buyBook', {
            email: props.email,
            cart: props.cart
        }, { headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` } }).then(result => {
            if (result.data.done) {
                $('.paymentProgress').css('display', 'none');
                alert('Payment has been received! Enjoy reading!');
                props.setCart([]);
                props.resetBooks("");
                props.resetDetails("");
                props.resetPrice(parseFloat(0).toFixed(2));
                props.history.push('/profile');
            }
        })
    }
    const onCancel = (data) => {
        /*   console.log('The payment was cancelled!', data); */
        alert('Payment has been canceled!');
    }
    const onError = (err) => {
        console.log("Error!", err);
    }
    const env = 'sandbox';
    const currency = 'USD';
    const total = parseFloat(props.totalPrice);
    const client = {
        sandbox: process.env.REACT_APP_PAYPAL_ONLINE_LIBRARY_ID_SANDBOX,
        production: process.env.REACT_APP_PAYPAL_ONLINE_LIBRARY_ID_LIVE,
    }
    return (
        <Button env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
    )
}

const mapStateToProps = (state) => {
    return {
        email: state.user.email,
        cart: state.cart.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCart: payload => dispatch(setCart(payload)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PayPalButton))