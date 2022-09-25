import { useState } from 'react'

import type { Book } from '@online-library/core'
import { useGetFreeAndPaidBooksQuery } from '@online-library/core'

export const useStore = () => {
   const [freeBooks, setFreeBooks] = useState<Book[]>([])
   const [paidBooks, setPaidBooks] = useState<Book[]>([])

   const [hasMoreFreeBooks, setHasMoreFreeBooks] = useState(true)
   const [hasMorePaidBooks, setHasMorePaidBooks] = useState(true)

   const { loading, fetchMore: getBooks } = useGetFreeAndPaidBooksQuery({
      variables: {
         freeBooksOffset: 0,
         paidBooksOffset: 0,
      },
      onCompleted: ({ freeBooks, paidBooks }) => {
         setFreeBooks(freeBooks)
         setPaidBooks(paidBooks)
      },
   })

   const getMoreBooks = (freeBooksOffset: number, paidBooksOffset: number) => {
      getBooks({
         variables: {
            freeBooksOffset,
            paidBooksOffset,
         },
         updateQuery: (query, { fetchMoreResult }) => {
            if (fetchMoreResult) {
               const { freeBooks, paidBooks } = fetchMoreResult
               setFreeBooks(books => [...books, ...freeBooks])
               setPaidBooks(books => [...books, ...paidBooks])
               freeBooksOffset > 0 && setHasMoreFreeBooks(freeBooks.length !== 0)
               paidBooksOffset > 0 && setHasMorePaidBooks(paidBooks.length !== 0)
            }
            return query
         },
      })
   }

   const areThereFreeBooks = !!freeBooks.length
   const areTherePaidBooks = !!paidBooks.length
   const shouldShowSearchBar = areThereFreeBooks && areTherePaidBooks

   const books = {
      freeBooks,
      setFreeBooks,
      paidBooks,
      setPaidBooks,
   }

   return {
      loading,
      freeBooks,
      paidBooks,
      hasMoreFreeBooks,
      hasMorePaidBooks,
      areThereFreeBooks,
      areTherePaidBooks,
      shouldShowSearchBar,
      books,
      setFreeBooks,
      setPaidBooks,
      getMoreBooks,
   }
}
