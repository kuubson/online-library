import middlewares from '../../../middlewares'

import { IContext } from '../types'

export default async (_, __, context: IContext) => {
    middlewares.roleAuthorization(context, 'user')
    return await context.user.getBooks({
        where: {
            price: null
        }
    })
}
