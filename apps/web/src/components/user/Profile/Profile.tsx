import { useState } from 'react'

import type { Book as BookType } from 'gql'

import { UserContent } from 'components/shared/styled'

import { BookSuggestions, Books } from 'components/shared'

import { BookPreview } from './modules'

import { useProfile } from './hooks'

export const Profile = () => {
   const { loading, boughtBooks, borrowedBooks, setBoughtBooks, setBorrowedBooks } = useProfile()

   const [bookPopupData, setBookPopupData] = useState<BookType>()

   const books = {
      freeBooks: borrowedBooks,
      setFreeBooks: setBorrowedBooks,
      paidBooks: boughtBooks,
      setPaidBooks: setBoughtBooks,
      withProfile: true,
   }

   const areThereBoughtBooks = !!boughtBooks.length
   const areThereBorrowedBooks = !!borrowedBooks.length

   const shouldShowSearchBar = areThereBoughtBooks && areThereBorrowedBooks

   return (
      <UserContent>
         {bookPopupData && <BookPreview {...bookPopupData} setBookPopupData={setBookPopupData} />}
         {!loading &&
            (!areThereBoughtBooks && !areThereBorrowedBooks ? (
               <Books books={[]} error="Go to store to get free books or buy some" />
            ) : (
               <>
                  <Books
                     books={boughtBooks}
                     header="Premium books"
                     error="No premium books"
                     setBookPopupData={setBookPopupData}
                     withProfile
                     {...((!areThereBorrowedBooks || shouldShowSearchBar) && {
                        searchBar: <BookSuggestions {...books} />,
                     })}
                  />
                  <Books
                     books={borrowedBooks}
                     header="Enjoy borrowed books"
                     error="No borrowed books"
                     setBookPopupData={setBookPopupData}
                     withProfile
                     {...(!areThereBoughtBooks && { searchBar: <BookSuggestions {...books} /> })}
                  />
               </>
            ))}
      </UserContent>
   )
}
