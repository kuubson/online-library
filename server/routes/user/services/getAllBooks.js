import { Connection, Book } from '@database'

export default {
    default: async (_, res, __) => {
        await Connection.transaction(async transaction => {
            const books = await Book.findAll({
                limit: 30,
                transaction
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
