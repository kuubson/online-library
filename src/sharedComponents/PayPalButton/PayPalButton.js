import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import axios from 'axios'
import PayPalButtonContent from 'react-paypal-express-checkout'
import { withRouter } from 'react-router-dom'

import ApiResponseHandler from '../Errors/ApiResponseHandler'

const PayPalButtonWrapper = styled.div`
    text-align: center;
    margin-top: 15px;
`;

const PayPalButton = props => {
    const dispatch = useDispatch()
    const [responseMessageError, setResponseMessageError] = useState()
    const [responseMessageWarning, setResponseMessageWarning] = useState()
    const [responseMessageSuccess, setResponseMessageSuccess] = useState()
    const cart = useSelector(state => state.global.cart)
    const email = useSelector(state => state.global.userEmail)
    const setIsLoading = payload => dispatch({ type: 'setIsLoading', payload })
    const setCart = () => dispatch({ type: 'setCart', payload: [] })
    const hideApiResponseHandler = () => {
        setResponseMessageError()
        setResponseMessageWarning()
        setResponseMessageSuccess()
        if (responseMessageSuccess) {
            setCart()
            props.history.push('/profile')
        }
    }
    const onSuccess = payment => {
        setIsLoading(true)
        axios.post('/buyBook', { cart, email }).then(res => {
            setIsLoading(false)
            if (res.data.error) {
                setResponseMessageError(res.data.errorMessage)
            }
            if (res.data.warning) {
                setResponseMessageWarning(res.data.warningMessage)
            }
            if (res.data.success) {
                setResponseMessageSuccess(res.data.successMessage)
            }
        })
    }
    const onCancel = data => {
        setResponseMessageWarning('You have stopped transaction!')
    }
    const onError = error => {
        setResponseMessageError('Something went wrong when trying to pay for a books! Try later!')
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
            {responseMessageError && <ApiResponseHandler error responseMessage={responseMessageError} onClick={hideApiResponseHandler} />}
            {responseMessageWarning && <ApiResponseHandler warning responseMessage={responseMessageWarning} onClick={hideApiResponseHandler} />}
            {responseMessageSuccess && <ApiResponseHandler success responseMessage={responseMessageSuccess} onClick={hideApiResponseHandler} />}
        </PayPalButtonWrapper>
    )
}

export default withRouter(PayPalButton)