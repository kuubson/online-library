import { Router } from 'express'

import middlewares from 'middlewares'

import cart from '../services/cart'

const router = Router()

router.post(
    '/getCart',
    middlewares.jwtAuthorization,
    cart.getCart.validation(),
    middlewares.checkValidation,
    cart.getCart.default as any
)

router.post(
    '/purchaseBooksWithStripe',
    middlewares.jwtAuthorization,
    cart.purchaseBooksWithStripe.validation(),
    middlewares.checkValidation,
    cart.purchaseBooksWithStripe.default as any
)

router.post(
    '/createPayPalPayment',
    middlewares.jwtAuthorization,
    cart.createPayPalPayment.validation(),
    middlewares.checkValidation,
    cart.createPayPalPayment.default as any
)

router.post(
    '/executePayPalPayment',
    middlewares.jwtAuthorization,
    cart.executePayPalPayment.validation(),
    middlewares.checkValidation,
    cart.executePayPalPayment.default as any
)

export default router
