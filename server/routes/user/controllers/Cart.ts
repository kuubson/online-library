import { Router } from 'express'

import { jwtAuthorization } from 'middlewares'

import { cart } from '../services'

export const Cart = Router()

Cart.post('/getCart', jwtAuthorization, cart.getCart.validation, cart.getCart.getCart as any)

Cart.post(
   '/purchaseBooksWithStripe',
   jwtAuthorization,
   cart.purchaseBooksWithStripe.validation,
   cart.purchaseBooksWithStripe.purchaseBooksWithStripe as any
)

Cart.post(
   '/createPayPalPayment',
   jwtAuthorization,
   cart.createPayPalPayment.validation,
   cart.createPayPalPayment.createPayPalPayment as any
)

Cart.post(
   '/executePayPalPayment',
   jwtAuthorization,
   cart.executePayPalPayment.validation,
   cart.executePayPalPayment.executePayPalPayment as any
)
