import { Op } from 'sequelize'

import { Connection, Book } from '@database'

import utils from '@utils'

export default {
    default: async (req, res, __) => {
        await Connection.transaction(async transaction => {
            const { title, author, withProfile } = req.body
            const property = !!title ? 'title' : 'author'
            const value = !!title ? title : author
            let books = []
            if (value) {
                if (!withProfile) {
                    books = await Book.findAll({
                        where: {
                            [property]: {
                                [Op.like]: `%${value}%`
                            }
                        },
                        transaction
                    })
                } else {
                    books = await req.user.getBooks({
                        where: {
                            [property]: {
                                [Op.like]: `%${value}%`
                            }
                        },
                        transaction
                    })
                }
            }
            res.send({
                books
            })
        })
    },
    validation: () => [utils.validator.validateBoolean('withProfile')]
}
