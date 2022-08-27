import { Router } from 'express'

import { jwtAuthorization } from 'middlewares'

import {
   createPayPalPayment,
   executePayPalPayment,
   getCart,
   purchaseBooksWithStripe,
} from '../services/cart'

export const Cart = Router()

Cart.use(jwtAuthorization)

Cart.post('/getCart', ...getCart)

Cart.post('/purchaseBooksWithStripe', ...purchaseBooksWithStripe)

Cart.post('/createPayPalPayment', ...createPayPalPayment)

Cart.post('/executePayPalPayment', ...executePayPalPayment)
