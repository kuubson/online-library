import type { Book } from 'database/models/Book'

export const totalBooksPrice = (books: Book[]) => {
   return books
      .map(({ price }) => price || 0)
      .reduce((total, price) => total + price, 0)
      .toFixed(2)
}
