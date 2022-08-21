import { useEffect, useState } from 'react'

import { axios } from 'utils'

type GetSuggestionsResponse = {
   books: BookType[]
}

export const useBookSuggestions = ({
   freeBooks,
   paidBooks,
   setFreeBooks,
   setPaidBooks,
   withProfile,
}: IBookSuggestions) => {
   const [title, setTitle] = useState('')

   const [author, setAuthor] = useState('')

   const [findByTitle, setFindByTitle] = useState(true)

   const [books, setBooks] = useState<BookType[]>([])

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

   const handleSort = (id: number, price: number) => {
      const filterOut = (book: BookType) => book.id !== id

      const filter = (book: BookType) => book.id === id

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
