import { Connection, Book } from 'database'

import utils from 'utils'

import { ProtectedRoute } from 'types/global'

const getCart: ProtectedRoute = async (req, res, next) => {
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

export default getCart
