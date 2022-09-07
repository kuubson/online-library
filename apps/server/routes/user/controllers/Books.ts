import { Router } from 'express'

import { getSuggestions } from '../services/books'

export const Books = Router()

Books.post(
   /**
      #swagger.description = `
         ✅ Suggest books by author or title <br />
         ✅ Searches either books assigned to the user or from the whole store <br />
      `
      #swagger.requestBody = {
         required: true,
         schema: { $ref: "#/definitions/getSuggestions" }
      }
      #swagger.responses[200] = {
         description: 'Returns array of books that meet certain title or author',
         schema: [{ $ref: '#/definitions/book' }]
      }  
*/
   '/getSuggestions',
   ...getSuggestions
)
