import { Connection, Book } from '@database'

import utils from '@utils'

export default async (req, res, _) => {
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
}

export const validation = () => [utils.validator.validateArray('cart', true)]
