import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'

type Query = {
   freeBooks: IBook[]
   paidBooks: IBook[]
}

const GET_FREE_AND_PAID_BOOKS = gql`
   query getFreeAndPaidBooks($freeBooksOffset: Int!, $paidBooksOffset: Int!) {
      freeBooks(freeBooksOffset: $freeBooksOffset, paidBooksOffset: $paidBooksOffset) {
         id
         title
         author
         cover
      }
      paidBooks(paidBooksOffset: $paidBooksOffset, freeBooksOffset: $freeBooksOffset) {
         id
         title
         author
         cover
         price
      }
   }
`

export const useStore = () => {
   const [freeBooks, setFreeBooks] = useState<IBook[]>([])
   const [paidBooks, setPaidBooks] = useState<IBook[]>([])
   const [hasMoreFreeBooks, setHasMoreFreeBooks] = useState(true)
   const [hasMorePaidBooks, setHasMorePaidBooks] = useState(true)
   const { loading, fetchMore: getBooks } = useQuery<Query>(GET_FREE_AND_PAID_BOOKS, {
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
         updateQuery: (_, { fetchMoreResult }): any => {
            if (fetchMoreResult) {
               const { freeBooks, paidBooks } = fetchMoreResult
               setFreeBooks(books => [...books, ...freeBooks])
               setPaidBooks(books => [...books, ...paidBooks])
               freeBooksOffset > 0 && setHasMoreFreeBooks(freeBooks.length !== 0)
               paidBooksOffset > 0 && setHasMorePaidBooks(paidBooks.length !== 0)
            }
         },
      })
   }
   return {
      loading,
      freeBooks,
      paidBooks,
      hasMoreFreeBooks,
      hasMorePaidBooks,
      setFreeBooks,
      setPaidBooks,
      getMoreBooks,
   }
}
