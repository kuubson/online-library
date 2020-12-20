import { Connection } from '@database'

export default {
    default: async (req, res, _) => {
        await Connection.transaction(async transaction => {
            const books = await req.user
                .getBooks({
                    transaction
                })
                .then(books => {
                    const boughtBooks = []
                    const borrowedBooks = []
                    books.map(book =>
                        book.price ? boughtBooks.push(book) : borrowedBooks.push(book)
                    )
                    return {
                        boughtBooks,
                        borrowedBooks
                    }
                })
            res.send(books)
        })
    }
}
