import { Router } from 'express'

import { getBooks } from '../services/books'

export const Books = Router()

Books.get(
   /**
      #swagger.summary = "Books searcher"
      #swagger.description = `
         ✅ Suggest books by author or title <br />
         ✅ Searches either books assigned to the user or from the whole store <br />
      `
      #swagger.parameters['obj'] = {
         in: 'query',
         required: true,
         schema: { $ref: "#/definitions/get@books" }
      } 
      #swagger.responses[200] = { 
         description: 'Returns array of books that meet certain title or author',
         schema: [{ $ref: '#/definitions/schema@book' }],
      }  
*/
   '',
   ...getBooks
)
