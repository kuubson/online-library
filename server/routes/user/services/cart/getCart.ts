import { Connection, Book } from 'database'

import { validator } from 'helpers'

import { ProtectedRoute } from 'types/express'

export const getCart: ProtectedRoute = async (req, res, next) => {
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

export const validation = () => [validator.validateArray('cart', true)]
