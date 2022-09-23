import type { API } from '@online-library/config'
import { ApiError } from '@online-library/config'

import { Book } from 'database'
import type { User } from 'database/models/User'

type VerifyPurchasingBooksProps = {
   user: User
   products: number[] | undefined
   header: string
   errors:
      | typeof API['/api/user/cart/stripe/payment']['post']['errors']
      | typeof API['/api/user/cart/paypal/checkout']['post']['errors']
}

export const verifyPurchasingBooks = async ({
   user,
   products,
   header,
   errors,
}: VerifyPurchasingBooksProps) => {
   const bookIds = await user
      .getBooks({ where: { id: products } })
      .then(books => books.map(({ id }) => id))

   const availableBooks = await Book.findAll({ where: { id: products } })

   if (!availableBooks.length) {
      throw new ApiError(header, errors[404], 404)
   }

   const books = availableBooks.filter(({ id }) => !bookIds.includes(id))

   if (!books.length) {
      throw new ApiError(header, errors[409], 409)
   }

   return { books }
}
