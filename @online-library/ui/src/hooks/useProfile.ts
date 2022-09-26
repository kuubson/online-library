import { useState } from 'react'

import type { Book } from '@online-library/core'
import { useGetProfileBooksQuery } from '@online-library/core'

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

   const areThereBoughtBooks = !!boughtBooks.length
   const areThereBorrowedBooks = !!borrowedBooks.length
   const shouldShowSearchBar = areThereBoughtBooks && areThereBorrowedBooks

   const books = {
      freeBooks: borrowedBooks,
      setFreeBooks: setBorrowedBooks,
      paidBooks: boughtBooks,
      setPaidBooks: setBoughtBooks,
      withProfile: true,
   }

   return {
      loading,
      boughtBooks,
      borrowedBooks,
      areThereBoughtBooks,
      areThereBorrowedBooks,
      shouldShowSearchBar,
      books,
      setBoughtBooks,
      setBorrowedBooks,
   }
}
