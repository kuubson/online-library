import { Connection, Book } from '@database'

export default {
    default: async (_, res, __) => {
        await Connection.transaction(async transaction => {
            const books = await Book.findAll({
                transaction,
                limit: 30
            }).then(books => {
                const freeBooks = []
                const paidBooks = []
                books.map(book => (!book.price ? freeBooks.push(book) : paidBooks.push(book)))
                return {
                    freeBooks,
                    paidBooks
                }
            })
            res.send(books)
        })
    }
}
