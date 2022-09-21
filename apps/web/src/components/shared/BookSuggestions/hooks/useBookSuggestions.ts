import { useEffect, useState } from 'react'

import { API } from '@online-library/tools'

import type { Book } from 'gql'

import { useForm } from 'hooks'

import { apiAxios } from 'utils'

import type { BookSuggestionsProps, BooksResponse } from 'types'

const { request, validation } = API['/api/user/books'].get

export const useBookSuggestions = ({
   freeBooks,
   paidBooks,
   setFreeBooks,
   setPaidBooks,
   withProfile,
}: BookSuggestionsProps) => {
   const { submit, control, getValues, setValue, watch, errors } = useForm(validation, {
      title: '',
      author: '',
      withProfile: withProfile ? 'true' : 'false',
   })

   const [findByTitle, setFindByTitle] = useState(true)

   const [books, setBooks] = useState<Book[]>([])

   const [title, author] = watch(['title', 'author'])

   useEffect(() => {
      if (title || author) {
         const getBooks = setTimeout(() => {
            submit(async () => {
               const response = await apiAxios<typeof validation, BooksResponse>(
                  request,
                  getValues()
               )
               if (response) {
                  const { books } = response.data
                  setBooks(books)
               }
            })()
         }, 500)
         return () => clearTimeout(getBooks)
      } else {
         resetForm()
      }
   }, [title, author])

   const error = errors.title?.message || errors.author?.message

   useEffect(() => {
      if (error) {
         setBooks([])
      }
   }, [error])

   const resetForm = () => {
      setBooks([])
      findByTitle ? setValue('title', '') : setValue('author', '')
   }

   const switchFindBy = () => {
      resetForm()
      setFindByTitle(findByTitle => !findByTitle)
   }

   const handleSort = (id: number, price: number | null | undefined) => {
      const notSuggestion = (book: Book) => book.id !== id

      const suggestion = (book: Book) => book.id === id

      if (!price) {
         const sortedFreeBooks = freeBooks.filter(notSuggestion)

         const sortedFreeBook = freeBooks.find(suggestion) || books.find(suggestion)

         if (sortedFreeBook) {
            setFreeBooks([sortedFreeBook, ...sortedFreeBooks])
         }
      } else {
         const sortedPaidBooks = paidBooks.filter(notSuggestion)

         const sortedPaidBook = paidBooks.find(suggestion) || books.find(suggestion)

         if (sortedPaidBook) {
            setPaidBooks([sortedPaidBook, ...sortedPaidBooks])
         }
      }

      resetForm()
   }

   return {
      title,
      author,
      findByTitle,
      books,
      switchFindBy,
      handleSort,
      control,
      error,
   }
}
