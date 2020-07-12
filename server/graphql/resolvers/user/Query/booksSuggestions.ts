import { Op } from 'sequelize'

import { Book } from '../../../../database/database'

import middlewares from '../../../../middlewares'

import { IContext } from '../../types'

interface IArgs {
    title: string
    author: string
    withProfile: string
}

export default async (_, { title, author, withProfile }: IArgs, context: IContext) => {
    middlewares.roleAuthorization(context, 'user')
    if (!withProfile) {
        switch (true) {
            case !!title:
                return await Book.findAll({
                    where: {
                        title: {
                            [Op.like]: `%${title}%`
                        }
                    }
                })
            case !!author:
                return await Book.findAll({
                    where: {
                        author: {
                            [Op.like]: `%${author}%`
                        }
                    }
                })
            default:
                return []
        }
    } else {
        switch (true) {
            case !!title:
                return await context.user.getBooks({
                    where: {
                        title: {
                            [Op.like]: `%${title}%`
                        }
                    }
                })
            case !!author:
                return await context.user.getBooks({
                    where: {
                        author: {
                            [Op.like]: `%${author}%`
                        }
                    }
                })
            default:
                return []
        }
    }
}
