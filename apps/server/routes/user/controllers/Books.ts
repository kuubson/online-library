import { Router } from 'express'

import { getSuggestions } from '../services/books'

export const Books = Router()

Books.post(
   // #swagger.tags = ['Books']
   '/getSuggestions',
   ...getSuggestions
)
