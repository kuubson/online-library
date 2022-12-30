import { Router } from 'express'

import { paypalCheckout, paypalPayment, stripePayment } from '../services/cart'

export const Cart = Router()

Cart.post(
   /**
      #swagger.summary = "Stripe payment processing"
      #swagger.description = `
         ✔️ Makes sure that user does not pay for already purchased books <br />
         ✔️ Checks if selected books are still available in the store <br />
         ✔️ Processes stripe payment with credit card <br />
         ✔️ Assigns purchased books to the user <br />
      `
      #swagger.requestBody = {
         required: true,
         schema: { $ref: "#/definitions/post@stripe-payment" }
      } 
      #swagger.responses[200] = { description: 'Successfully purchased new books' }
      #swagger.responses[404] = { description: 'Selected books are not available anymore' } 
      #swagger.responses[409] = { description: 'Selected books has been already purchased before' }
      #swagger.responses[402] = { description: 'Payment has failed' } 
*/
   '/stripe/payment',
   ...stripePayment
)

Cart.post(
   /**
      #swagger.summary = "Paypal checkout"
      #swagger.description = `
         ✔️ Makes sure that user does not pay for already purchased books <br />
         ✔️ Checks if selected books are still available in the store <br />
         ✔️ Prepares paypal payment details <br />
         ✔️ Redirects user to paypal checkout <br />
      `
      #swagger.requestBody = {
         required: true,
         schema: { $ref: "#/definitions/post@paypal-checkout" }
      }
      #swagger.responses[200] = { 
         description: 'Returns paypal checkout link',
         schema: { $ref: '#/definitions/schema@paypal-link' },
      }  
      #swagger.responses[404] = { description: 'Selected books are not available anymore' } 
      #swagger.responses[409] = { description: 'Selected books has been already purchased before' }
      #swagger.responses[402] = { description: 'There was a problem preparing the payment, try again' }  
*/
   '/paypal/checkout',
   ...paypalCheckout
)

Cart.post(
   /**
      #swagger.summary = "Paypal payment processing"
      #swagger.description = `
         ✔️ Checks if user booked paymeny with certain id <br />
         ✔️ Checks if payment is still in progress <br />
         ✔️ Finalizes paypal payment and updates its status <br />
         ✔️ Assigns purchased books to the user <br />
      `
      #swagger.requestBody = {
         required: true,
         schema: { $ref: "#/definitions/post@paypal-payment" }
      }
      #swagger.responses[200] = { description: 'Successfully purchased new books' }
      #swagger.responses[409] = { description: 'The order has been already approved' }  
      #swagger.responses[402] = { description: 'Payment has failed' }  
      #swagger.responses[404] = { description: 'Bad payment id' }  
*/
   '/paypal/payment',
   ...paypalPayment
)
