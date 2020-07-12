import { Book } from '../../../../database/database'

import middlewares from '../../../../middlewares'

import { IContext } from '../../types'

interface IArgs {
    ids: number[]
}

export default async (_, { ids }: IArgs, context: IContext) => {
    middlewares.roleAuthorization(context, 'user')
    return await Book.findAll({
        where: {
            id: ids
        }
    })
}
