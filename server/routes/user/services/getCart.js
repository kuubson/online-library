import { Connection, Book } from '@database'

import utils from '@utils'

export default async (req, res, next) => {
    try {
        await Connection.transaction(async transaction => {
            const { cart } = req.body
            const books = await Book.findAll({
                where: {
                    id: cart
                },
                transaction
            })
            res.send({
                books
            })
        })
    } catch (error) {
        next(error)
    }
}

export const validation = () => [utils.validator.validateArray('cart', true)]
