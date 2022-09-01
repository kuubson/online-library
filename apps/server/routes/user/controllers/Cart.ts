import { Router } from 'express'

import { jwtAuthorization, checkValidation } from 'middlewares'

import { cart } from '../services'

export const Cart = Router()

Cart.post(
    '/getCart',
    jwtAuthorization,
    cart.getCart.validation(),
    checkValidation,
    cart.getCart.getCart as any
)

Cart.post(
    '/purchaseBooksWithStripe',
    jwtAuthorization,
    cart.purchaseBooksWithStripe.validation(),
    checkValidation,
    cart.purchaseBooksWithStripe.purchaseBooksWithStripe as any
)

Cart.post(
    '/createPayPalPayment',
    jwtAuthorization,
    cart.createPayPalPayment.validation(),
    checkValidation,
    cart.createPayPalPayment.createPayPalPayment as any
)

Cart.post(
    '/executePayPalPayment',
    jwtAuthorization,
    cart.executePayPalPayment.validation(),
    checkValidation,
    cart.executePayPalPayment.executePayPalPayment as any
)
