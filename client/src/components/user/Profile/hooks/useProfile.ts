import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'

type Query = {
   boughtBooks: BookType[]
   borrowedBooks: BookType[]
}

const GET_PROFILE_BOOKS = gql`
   query getProfileBooks {
      boughtBooks {
         id
         title
         author
         cover
      }
      borrowedBooks {
         id
         title
         author
         cover
      }
   }
`

export const useProfile = () => {
   const [boughtBooks, setBoughtBooks] = useState<BookType[]>([])

   const [borrowedBooks, setBorrowedBooks] = useState<BookType[]>([])

   const { loading } = useQuery<Query>(GET_PROFILE_BOOKS, {
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
