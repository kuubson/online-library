import { Router } from 'express'

import middlewares from 'middlewares'

import books from '../services/books'

const router = Router()

router.post(
    '/getSuggestions',
    middlewares.jwtAuthorization,
    books.getSuggestions.validation(),
    middlewares.checkValidation,
    books.getSuggestions.default as any
)

export default router
