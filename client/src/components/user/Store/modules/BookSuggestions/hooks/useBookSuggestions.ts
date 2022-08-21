import { useEffect, useState } from 'react'

import type { Book } from 'gql'

import { axios } from 'utils'

import type { BookSuggestionsProps } from '../types'

type GetSuggestionsResponse = {
   books: Book[]
}

export const useBookSuggestions = ({
   freeBooks,
   paidBooks,
   setFreeBooks,
   setPaidBooks,
   withProfile,
}: BookSuggestionsProps) => {
   const [title, setTitle] = useState('')

   const [author, setAuthor] = useState('')

   const [findByTitle, setFindByTitle] = useState(true)

   const [books, setBooks] = useState<Book[]>([])

   useEffect(() => {
      const getSuggestions = async () => {
         const url = '/api/user/books/getSuggestions'

         const response = await axios.post<GetSuggestionsResponse>(url, {
            title,
            author,
            withProfile: !!withProfile,
         })

         if (response) {
            const { books } = response.data
            setBooks(books)
         }
      }

      getSuggestions()
   }, [title, author, withProfile])

   const switchFindBy = () => {
      findByTitle ? setTitle('') : setAuthor('')
      setFindByTitle(findByTitle => !findByTitle)
   }

   const handleSort = (id: number, price: number | null | undefined) => {
      const filterOut = (book: Book) => book.id !== id

      const filter = (book: Book) => book.id === id

      if (!price) {
         const sortedFreeBooks = freeBooks.filter(filterOut)

         const sortedFreeBook = freeBooks.find(filter) || books.find(filter)

         if (sortedFreeBook) {
            setFreeBooks([sortedFreeBook, ...sortedFreeBooks])
         }
      } else {
         const sortedPaidBooks = paidBooks.filter(filterOut)

         const sortedPaidBook = paidBooks.find(filter) || books.find(filter)

         if (sortedPaidBook) {
            setPaidBooks([sortedPaidBook, ...sortedPaidBooks])
         }
      }

      findByTitle ? setTitle('') : setAuthor('')
   }

   return {
      title,
      author,
      findByTitle,
      books,
      setTitle,
      setAuthor,
      switchFindBy,
      handleSort,
   }
}
