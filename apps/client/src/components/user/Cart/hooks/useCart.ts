import { useState, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'

import { useQueryParams, useCart as useCartHook } from 'hooks'

import { setApiFeedback } from 'helpers'

import { axios, history } from 'utils'

type Query = {
    books: IBook[]
}

const GET_BOOKS = gql`
    query getBooks($ids: [Int!]!) {
        books(ids: $ids) {
            id
            title
            author
            cover
            price
        }
    }
`

export const useCart = () => {
    const { paymentId, PayerID } = useQueryParams()
    const { cart, resetCart } = useCartHook()
    const { data } = useQuery<Query>(GET_BOOKS, {
        variables: {
            ids: cart
        }
    })
    const books = data ? data.books : []
    const [price, setPrice] = useState('')
    useEffect(() => {
        let total = 0
        books.map(({ price }) => (total += price))
        setPrice(total.toFixed(2))
    }, [books])
    useEffect(() => {
        const executePayPalPayment = async () => {
            try {
                if (paymentId && PayerID) {
                    const url = '/api/user/cart/executePayPalPayment'
                    const response = await axios.post(url, {
                        paymentId,
                        PayerID
                    })
                    if (response) {
                        setApiFeedback(
                            'Submitting the order',
                            `You have successfully purchased new books`,
                            'Check them out in your profile',
                            () => {
                                resetCart()
                                history.push('/profile')
                            }
                        )
                    }
                }
            } catch (error: any) {
                if (error.response.status === 409) {
                    resetCart()
                    history.push('/profile')
                }
            }
        }
        executePayPalPayment()
    }, [paymentId, PayerID])
    const createPayPalPayment = async () => {
        const url = '/api/user/cart/createPayPalPayment'
        const response = await axios.post(url, {
            products: cart
        })
        if (response) {
            window.location = response.data.link
        }
    }
    return {
        books,
        price,
        createPayPalPayment
    }
}
