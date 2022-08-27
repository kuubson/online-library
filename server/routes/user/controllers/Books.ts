import { Router } from 'express'

import { getSuggestions } from '../services/books'

export const Books = Router()

Books.post('/getSuggestions', ...getSuggestions)
