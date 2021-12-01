import * as getCart from './getCart'
import * as purchaseBooksWithStripe from './purchaseBooksWithStripe'
import * as createPayPalPayment from './createPayPalPayment'
import * as executePayPalPayment from './executePayPalPayment'

const cart = {
    getCart,
    purchaseBooksWithStripe,
    createPayPalPayment,
    executePayPalPayment
}

export default cart
