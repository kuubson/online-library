import type { API } from 'online-library'
import { ApiError } from 'online-library'

import { Book } from 'database'
import type { User } from 'database/models/User'

type VerifyPurchasingBooksProps = {
   user: User
   products: number[] | undefined
   path: typeof API['purchaseBooksWithStripe'] | typeof API['createPayPalPayment']
}

export const verifyPurchasingBooks = async ({
   user,
   products,
   path,
}: VerifyPurchasingBooksProps) => {
   const { header, post } = path

   const userBooks = await user
      .getBooks({ where: { id: products } })
      .then(books => books.map(({ id }) => id))

   const availableBooks = await Book.findAll({ where: { id: products } })

   if (!availableBooks.length) {
      throw new ApiError(header, post[404], 404)
   }

   const books = availableBooks.filter(({ id }) => !userBooks.includes(id))

   if (!books.length) {
      throw new ApiError(header, post[409], 409)
   }

   return { books }
}
