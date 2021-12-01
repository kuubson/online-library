import { Connection } from '@database'

const getUserBooks = async (req, res, next) => {
    try {
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
    } catch (error) {
        next(error)
    }
}

export default getUserBooks
