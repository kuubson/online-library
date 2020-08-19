import { Op } from 'sequelize'

import { Book } from '../../../../database/database'

import middlewares from '../../../../middlewares'

import { IContext } from '../../types'

export default async (_, __, context: IContext) => {
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
