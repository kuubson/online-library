import { Book } from '@database'

import middlewares from '@middlewares'

export default async (_, __, context) => {
    middlewares.roleAuthorization(context, 'user')
    return await Book.findAll({
        where: {
            price: null
        },
        limit: 20
    })
}
