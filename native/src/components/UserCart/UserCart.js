import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { WebView } from 'react-native-webview'
import queryString from 'query-string'
import { Actions } from 'react-native-router-flux'

import { API_URL } from '@env'

import hooks from 'hooks'

import { UserStoreContainer } from 'components/UserStore/UserStore'

import HDashboard from 'components/Home/styled/Dashboard'
import ULDashboard from 'components/UserLogin/styled/Dashboard'
import USDashboard from 'components/UserStore/styled/Dashboard'
import Dashboard from './styled/Dashboard'

import USComposed from 'components/UserStore/composed'

import utils from 'utils'

const UserCartContainer = styled(UserStoreContainer)``

const UserCart = () => {
    const { setShouldPayPalModalAppear } = hooks.usePayPalModal()
    const [payPalLink, setPayPalLink] = useState('')
    const [paymentId, setPaymentId] = useState('')
    const [PayerID, setPayerID] = useState('')
    const { cart, resetCart } = hooks.useCart()
    const [books, setBooks] = useState([])
    const [price, setPrice] = useState()
    const areThereBooks = books.length > 0
    useEffect(() => () => setShouldPayPalModalAppear(false), [])
    useEffect(() => {
        const getCart = async () => {
            const url = `${API_URL}/api/user/getCart`
            const response = await utils.apiAxios.post(url, {
                cart
            })
            if (response) {
                const { books } = response.data
                setBooks(books)
                setPrice(
                    books
                        .map(({ price }) => price)
                        .reduce((total, price) => total + price, 0)
                        .toFixed(2)
                )
            }
        }
        getCart()
    }, [cart])
    useEffect(() => {
        const executePayPalPayment = async () => {
            try {
                if (paymentId && PayerID) {
                    const url = `${API_URL}/api/user/executePayPalPayment`
                    const response = await utils.apiAxios.post(url, {
                        paymentId,
                        PayerID
                    })
                    if (response) {
                        utils.setFeedbackData(
                            'Submitting the order',
                            `You have successfully purchased new books`,
                            'Check them out in your profile',
                            () => {
                                resetCart()
                                Actions.UserProfile()
                            }
                        )
                    }
                }
            } catch (error) {
                if (error.response.status === 409) {
                    resetCart()
                    Actions.UserProfile()
                }
            }
        }
        executePayPalPayment()
    }, [paymentId, PayerID])
    const createPayPalPayment = async () => {
        const url = `${API_URL}/api/user/createPayPalPayment`
        const response = await utils.apiAxios.post(url, {
            products: cart
        })
        if (response) {
            setPayPalLink(response.data.link)
            setShouldPayPalModalAppear(true)
        }
    }
    return (
        <UserCartContainer>
            {!!payPalLink && (
                <WebView
                    source={{ uri: payPalLink }}
                    onNavigationStateChange={data => {
                        const url = data.url.replace(`${API_URL}/user/cart?`, '')
                        const { paymentId, PayerID } = queryString.parse(url)
                        if (paymentId && PayerID) {
                            setPaymentId(paymentId)
                            setPayerID(PayerID)
                            setPayPalLink()
                            setShouldPayPalModalAppear(false)
                        }
                    }}
                    containerStyle={{
                        paddingTop: utils.scale(175),
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        zIndex: 1
                    }}
                />
            )}
            <USComposed.Books
                books={books}
                header="Your chosen books"
                error="The cart is empty"
                withCart
            />
            {areThereBooks && (
                <Dashboard.SummaryContainer>
                    <USDashboard.Header>Summary</USDashboard.Header>
                    {books.map(({ id, title, price }, index) => (
                        <Dashboard.Summary key={id} last={index === books.length - 1}>
                            Book "{title}" 1 x ${price?.toFixed(2)}
                        </Dashboard.Summary>
                    ))}
                    <ULDashboard.Button>
                        <HDashboard.ButtonText>Pay ${price}</HDashboard.ButtonText>
                    </ULDashboard.Button>
                    <Dashboard.PayPalButton onPress={createPayPalPayment}>
                        <Dashboard.ButtonText>Pay with PayPal</Dashboard.ButtonText>
                    </Dashboard.PayPalButton>
                </Dashboard.SummaryContainer>
            )}
        </UserCartContainer>
    )
}

export default UserCart
