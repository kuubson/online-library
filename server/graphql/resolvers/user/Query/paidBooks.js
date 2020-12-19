import { Op } from 'sequelize'

import { Book } from '@database'

import middlewares from '@middlewares'

export default async (_, __, context) => {
    middlewares.roleAuthorization(context, 'user')
    return await Book.findAll({
        where: {
            price: {
                [Op.ne]: null
            }
        },
        limit: 20
    })
}
