import { Router } from 'express'

import { jwtAuthorization, rateLimiter } from 'middlewares'

import { Auth } from './Auth'
import { Books } from './Books'
import { Cart } from './Cart'
import { Chat } from './Chat'
import { Global } from './Global'

export const UserController = Router()

UserController.use(
   /*
   #swagger.tags = ['Auth (rate limited)']
   #swagger.responses[422] = {
      description: 'Data validation failed',   
   } 
*/
   '/api/user/auth/',
   rateLimiter(),
   Auth
)

UserController.use(
   /*
   #swagger.tags = ['Books']
   #swagger.security = [{ "token": [] }]    
*/
   '/api/user/books/',
   jwtAuthorization,
   Books
)
UserController.use(
   /*
   #swagger.tags = ['Cart']
   #swagger.responses[422] = {
      description: 'Data validation failed',   
   } 
   #swagger.security = [{ "token": [] }]    
*/
   '/api/user/cart/',
   jwtAuthorization,
   Cart
)
UserController.use(
   /*
   #swagger.tags = ['Chat']
   #swagger.responses[422] = {
      description: 'Data validation failed',   
   } 
   #swagger.security = [{ "token": [] }]    
*/
   '/api/user/chat/',
   jwtAuthorization,
   Chat
)
UserController.use(
   /*
   #swagger.tags = ['Global']
   #swagger.responses[422] = {
      description: 'Data validation failed',   
   }
*/
   '/api/user/global/',
   Global
)
