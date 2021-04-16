import { Op } from 'sequelize'

import { Connection, Book } from '@database'

import utils from '@utils'

export default async (req, res, __) => {
    await Connection.transaction(async transaction => {
        const { freeBooksOffset, paidBooksOffset } = req.body
        const freeBooks = await Book.findAll({
            where: {
                price: null
            },
            limit: paidBooksOffset > 0 ? 0 : 10,
            offset: freeBooksOffset,
            transaction
        })
        const paidBooks = await Book.findAll({
            where: {
                price: {
                    [Op.ne]: null
                }
            },
            limit: freeBooksOffset > 0 ? 0 : 10,
            offset: paidBooksOffset,
            transaction
        })
        res.send({
            freeBooks,
            paidBooks
        })
    })
}

export const validation = () => [
    utils.validator.validateInteger('freeBooksOffset'),
    utils.validator.validateInteger('paidBooksOffset')
]
