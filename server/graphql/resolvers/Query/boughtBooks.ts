import { Op } from 'sequelize'

import { IContext } from '../types'

export default async (_, __, context: IContext) =>
    await context.user.getBooks({
        where: {
            price: {
                [Op.ne]: null
            }
        }
    })
