import { Router } from 'express'

import {
   createPayPalPayment,
   executePayPalPayment,
   purchaseBooksWithStripe,
} from '../services/cart'

export const Cart = Router()

Cart.post(
   /*
   `  #swagger.tags = ['Cart']
      #swagger.description = `
         ✅ Makes sure that user does not pay for already purchased books <br />
         ✅ Processes stripe payment with credit card <br />
         ✅ Assigns purchased books to the user <br />
      `
      #swagger.parameters['paymentId'] = {
         in: 'body',
         description: 'Payment id created with stripe package on frontend',
         required: 'true',
         schema: { $ref: '#/definitions/stripePaymentId' }
      } 
      #swagger.parameters['products'] = {
         in: 'body',
         description: 'Array of book ids to purchase',
         required: 'true',
         schema: { $ref: '#/definitions/products' }
      } 
      #swagger.responses[409] = {
         description: 'You have already purchased selected books before',
      }  
      #swagger.responses[402] = {
         description: 'Payment has failed',
      }  
    */
   '/purchaseBooksWithStripe',
   ...purchaseBooksWithStripe
)

Cart.post(
   /*
   `  #swagger.tags = ['Cart']
      #swagger.description = `
         ✅ Makes sure that user does not pay for already purchased books <br />
         ✅ Prepares paypal payment details <br />
         ✅ Redirects user to paypal checkout <br />
      `
      #swagger.parameters['products'] = {
         in: 'body',
         description: 'Array of book ids to purchase',
         required: 'true',
         schema: { $ref: '#/definitions/products' }
      } 
      #swagger.responses[409] = {
         description: 'You have already purchased selected books before',
      }  
      #swagger.responses[402] = {
         description: 'There was a problem preparing the payment, try again',
      }  
    */
   '/createPayPalPayment',
   ...createPayPalPayment
)

Cart.post(
   /*
   `  #swagger.tags = ['Cart']
      #swagger.description = `
         ✅ Checks if user booked paymeny with certain id <br />
         ✅ Checks if payment is still in progress <br />
         ✅ Finalizes paypal payment and updates its status <br />
         ✅ Assigns purchased books to the user <br />
      `
      #swagger.parameters['paymentId'] = {
         in: 'body',
         description: 'Payment id generated after submitting paypal checkout',
         required: 'true',
         schema: { $ref: '#/definitions/paypalPaymentId' }
      } 
      #swagger.parameters['paypalPayerID'] = {
         in: 'body',
         description: 'Payer id generated after submitting paypal checkout',
         required: 'true',
         schema: { $ref: '#/definitions/paypalPayerID' }
      } 
      #swagger.responses[409] = {
         description: 'The order has been already approved',
      }  
      #swagger.responses[402] = {
         description: 'Payment has failed',
      }  
      #swagger.responses[404] = {
         description: 'Bad payment id',
      }  
    */
   '/executePayPalPayment',
   ...executePayPalPayment
)
