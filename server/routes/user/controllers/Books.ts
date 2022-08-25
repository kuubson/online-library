import { Router } from 'express'

import { jwtAuthorization } from 'middlewares'

import { books } from '../services'

export const Books = Router()

Books.post(
   '/getSuggestions',
   jwtAuthorization,
   books.getSuggestions.validation,
   books.getSuggestions.getSuggestions
)
