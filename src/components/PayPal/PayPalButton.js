import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import axios from 'axios'
import PayPalButtonContent from 'react-paypal-express-checkout'
import { withRouter } from 'react-router-dom'

const PayPalButtonWrapper = styled.div`
    text-align: center;
    margin-top: 15px;
`;

const PayPalButton = props => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.global.cart)
    const email = useSelector(state => state.global.userEmail)
    const setIsLoading = payload => dispatch({ type: 'setIsLoading', payload })
    const setCart = payload => dispatch({ type: 'setCart', payload })
    const setApiResponseSuccessMessage = payload => dispatch({ type: 'setApiResponseSuccessMessage', payload })
    const setApiResponseErrorMessage = payload => dispatch({ type: 'setApiResponseErrorMessage', payload })
    const setApiResponseWarningMessage = payload => dispatch({ type: 'setApiResponseWarningMessage', payload })
    const setApiResponseCallbackFunction = payload => dispatch({ type: 'setApiResponseCallbackFunction', payload })
    const onSuccess = payment => {
        setIsLoading(true)
        axios.post('/buyBook', { cart, email }).then(res => {
            setIsLoading(false)
            if (res.data.error) {
                setApiResponseErrorMessage(res.data.errorMessage)
            }
            if (res.data.warning) {
                setApiResponseWarningMessage(res.data.warningMessage)
            }
            if (res.data.success) {
                setApiResponseSuccessMessage(res.data.successMessage)
                setApiResponseCallbackFunction(() => {
                    setCart([])
                    props.history.push('/profile')
                })
            }
        }).catch(error => {
            if (error) {
                setIsLoading(false)
                setApiResponseErrorMessage(`Something went wrong, if you haven't received bought books, contact us immediately!!`)
            }
        })
    }
    const onCancel = data => {
        setApiResponseWarningMessage('You have stopped a transaction!')
    }
    const onError = error => {
        setApiResponseErrorMessage('Something went wrong when trying to pay for a books! Try later!')
    }
    const env = 'sandbox';
    const currency = 'USD';
    const client = {
        sandbox: process.env.REACT_APP_PAYPAL_ONLINE_LIBRARY_ID_SANDBOX,
        production: process.env.REACT_APP_PAYPAL_ONLINE_LIBRARY_ID_LIVE,
    }
    const style = {
        color: 'blue',
        label: 'paypal'
    }
    return (
        <PayPalButtonWrapper>
            <PayPalButtonContent
                style={style}
                env={env}
                client={client}
                currency={currency}
                total={props.price}
                onError={onError}
                onSuccess={onSuccess}
                onCancel={onCancel} />
        </PayPalButtonWrapper>
    )
}

export default withRouter(PayPalButton)