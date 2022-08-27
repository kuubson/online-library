import { Router } from 'express'

import { jwtAuthorization } from 'middlewares'

import { getSuggestions } from '../services/books'

export const Books = Router()

Books.use(jwtAuthorization)

Books.post('/getSuggestions', ...getSuggestions)
