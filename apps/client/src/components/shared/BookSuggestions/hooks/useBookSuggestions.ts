import { useEffect, useState } from 'react'

import { API } from '@online-library/tools'

import type { Book } from 'gql'

import { useForm } from 'hooks'

import { apiAxios } from 'utils'

import type { BookSuggestionsProps, GetSuggestionsResponse } from 'types'

const { post } = API['/api/user/books/suggestions']

export const useBookSuggestions = ({
   freeBooks,
   paidBooks,
   setFreeBooks,
   setPaidBooks,
   withProfile,
}: BookSuggestionsProps) => {
   const { submit, control, getValues, setValue, watch, errors } = useForm(post.validation, {
      title: '',
      author: '',
      withProfile: !!withProfile,
   })

   const [findByTitle, setFindByTitle] = useState(true)

   const [books, setBooks] = useState<Book[]>([])

   const [title, author] = watch(['title', 'author'])

   useEffect(() => {
      if (title || author) {
         const getSuggestions = setTimeout(
            () =>
               submit(async () => {
                  const response = await apiAxios<GetSuggestionsResponse>(post, getValues())
                  if (response) {
                     const { books } = response.data
                     setBooks(books)
                  }
               })(),
            500
         )
         return () => clearTimeout(getSuggestions)
      } else {
         resetForm()
      }
   }, [title, author])

   const error = (errors.title?.message || errors.author?.message) as string // TODO: remove as string

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
