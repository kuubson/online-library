import { Router } from 'express'

import {
   createPayPalPayment,
   executePayPalPayment,
   getCart,
   purchaseBooksWithStripe,
} from '../services/cart'

export const Cart = Router()

Cart.post(
   // #swagger.tags = ['Cart']
   '/getCart',
   ...getCart
)

Cart.post(
   // #swagger.tags = ['Cart']
   '/purchaseBooksWithStripe',
   ...purchaseBooksWithStripe
)

Cart.post(
   // #swagger.tags = ['Cart']
   '/createPayPalPayment',
   ...createPayPalPayment
)

Cart.post(
   // #swagger.tags = ['Cart']
   '/executePayPalPayment',
   ...executePayPalPayment
)
