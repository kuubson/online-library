import { Router } from 'express'

import { getSuggestions } from '../services/books'

export const Books = Router()

Books.post(
   /*
   `  #swagger.tags = ['Books']
      #swagger.description = `
         ✅ Suggest books by searched author or title <br />
      `
      #swagger.parameters['title'] = {
         in: 'body',
         description: 'Title to search for',
         required: 'false',
         schema: { $ref: '#/definitions/plain' }
      } 
      #swagger.parameters['author'] = {
         in: 'body',
         description: 'Author to search for',
         required: 'false',
         schema: { $ref: '#/definitions/plain' }
      } 
      #swagger.parameters['withProfile'] = {
         in: 'body',
         description: 'Flag that decides if suggest global books or books of certain user',
         required: 'true',
         schema: { $ref: '#/definitions/boolean' }
      } 
    */
   '/getSuggestions',
   ...getSuggestions
)
