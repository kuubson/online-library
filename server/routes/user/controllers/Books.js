import { Router } from 'express'

import middlewares from '@middlewares'

import books from '../services/books'

const router = Router()

router.post(
    '/getBooks',
    middlewares.jwtAuthorization,
    books.getBooks.validation(),
    middlewares.checkValidation,
    books.getBooks.default
)

router.post(
    '/getSuggestions',
    middlewares.jwtAuthorization,
    books.getSuggestions.validation(),
    middlewares.checkValidation,
    books.getSuggestions.default
)

router.post(
    '/borrowBook',
    middlewares.jwtAuthorization,
    books.borrowBook.validation(),
    middlewares.checkValidation,
    books.borrowBook.default
)

router.get('/getUserBooks', middlewares.jwtAuthorization, books.getUserBooks.default)

export default router
