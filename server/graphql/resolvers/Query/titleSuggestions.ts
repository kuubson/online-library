import { Op } from 'sequelize'

import { Book } from '../../../database/database'

interface IArgs {
    title: string
    author: string
}

export default async (_, { title, author }: IArgs) => {
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
}
