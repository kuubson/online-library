import { Op } from 'sequelize'
import { check } from 'express-validator'

import { Connection, Book } from 'database'
import { Book as BookClass } from 'database/models/Book'

import utils from 'utils'

import { ProtectedRoute } from 'types/express'

const getSuggestions: ProtectedRoute = async (req, res, next) => {
    try {
        await Connection.transaction(async transaction => {
            const { title, author, withProfile } = req.body
            const property = !!title ? 'title' : 'author'
            const value = !!title ? title : author
            let books: BookClass[] = []
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
    } catch (error) {
        next(error)
    }
}

export const validation = () => [
    check('title').trim().isString().bail().escape(),
    check('author').trim().isString().bail().escape(),
    utils.validator.validateBoolean('withProfile')
]

export default getSuggestions
