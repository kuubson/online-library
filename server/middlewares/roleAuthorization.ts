import { cookie } from 'utils'

import { GraphqlContext } from 'types'

export const roleAuthorization = (context: GraphqlContext, role = 'user') => {
   try {
      if (context.req.user.role !== role) {
         throw new Error('Authorization Error')
      }
   } catch (error) {
      context.res.clearCookie('token', cookie()).status(401)
   }
}
