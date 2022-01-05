import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'

type Query = {
    boughtBooks: IBook[]
    borrowedBooks: IBook[]
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
    const [boughtBooks, setBoughtBooks] = useState<IBook[]>([])
    const [borrowedBooks, setBorrowedBooks] = useState<IBook[]>([])
    const { loading } = useQuery<Query>(GET_PROFILE_BOOKS, {
        fetchPolicy: 'cache-and-network',
        onCompleted: ({ boughtBooks, borrowedBooks }) => {
            setBoughtBooks(boughtBooks)
            setBorrowedBooks(borrowedBooks)
        }
    })
    return {
        loading,
        boughtBooks,
        borrowedBooks,
        setBoughtBooks,
        setBorrowedBooks
    }
}
