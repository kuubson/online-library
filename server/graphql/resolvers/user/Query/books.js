import { Book } from '@database'

import middlewares from '@middlewares'

export default async (_, { ids }, context) => {
    middlewares.roleAuthorization(context, 'user')
    return await Book.findAll({
        where: {
            id: ids
        }
    })
}
