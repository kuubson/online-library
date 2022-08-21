import { useState } from 'react'

import type { Book } from 'gql'
import { useGetProfileBooksQuery } from 'gql'

export const useProfile = () => {
   const [boughtBooks, setBoughtBooks] = useState<Book[]>([])

   const [borrowedBooks, setBorrowedBooks] = useState<Book[]>([])

   const { loading } = useGetProfileBooksQuery({
      fetchPolicy: 'cache-and-network',
      onCompleted: ({ boughtBooks, borrowedBooks }) => {
         setBoughtBooks(boughtBooks)
         setBorrowedBooks(borrowedBooks)
      },
   })

   return {
      loading,
      boughtBooks,
      borrowedBooks,
      setBoughtBooks,
      setBorrowedBooks,
   }
}
