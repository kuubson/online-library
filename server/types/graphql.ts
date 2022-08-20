import { Request, Response } from 'express'

import { User } from 'database/models/User'

export type GraphQLRequest = Request & {
   user: {
      user: User
      role: 'user'
   }
}

export type GraphQLContext = {
   req: GraphQLRequest
   res: Response
}
