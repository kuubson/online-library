import { Router } from 'express'

import { jwtAuthorization, rateLimiter } from 'middlewares'

import { Auth } from './Auth'
import { Books } from './Books'
import { Cart } from './Cart'
import { Chat } from './Chat'

export const UserController = Router()

UserController.use(
   /*
   #swagger.tags = ['Auth (rate limited)']
   #swagger.responses[422] = { $ref: "#/definitions/422@data-validation" }
   #swagger.responses[429] = { $ref: "#/definitions/429@rate-limit" }
*/
   '/api/user/auth',
   rateLimiter(),
   Auth
)

UserController.use(
   /*
   #swagger.tags = ['Books']
   #swagger.responses[422] = { $ref: "#/definitions/422@data-validation" }
   #swagger.security = [{ "authToken": [] }]    
*/
   '/api/user/books',
   jwtAuthorization,
   Books
)

UserController.use(
   /*
   #swagger.tags = ['Cart']
   #swagger.responses[422] = { $ref: "#/definitions/422@data-validation" }
   #swagger.security = [{ "authToken": [] }]    
*/
   '/api/user/cart',
   jwtAuthorization,
   Cart
)

UserController.use(
   /*
   #swagger.tags = ['Chat']
   #swagger.responses[422] = { $ref: "#/definitions/422@data-validation" }
   #swagger.security = [{ "authToken": [] }]    
*/
   '/api/user/chat',
   jwtAuthorization,
   Chat
)
