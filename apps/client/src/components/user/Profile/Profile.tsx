import { useState } from 'react'

import type { Book as BookType } from 'gql'

import { UserContent } from 'components/shared/styled'

import { BookSuggestions, Books } from 'components/shared'

import { BookPreview } from './modules'

import { useProfile } from './hooks'

type ProfileProps = {
   shouldMenuExpand?: boolean
}

export const Profile = ({ shouldMenuExpand }: ProfileProps) => {
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

   return (
      <UserContent shouldMenuExpand={shouldMenuExpand}>
         {bookPopupData && <BookPreview {...bookPopupData} setBookPopupData={setBookPopupData} />}
         {!loading &&
            (!areThereBoughtBooks && !areThereBorrowedBooks ? (
               <Books books={[]} error="Go to store to get free books or just buy some" />
            ) : (
               <>
                  <Books
                     books={boughtBooks}
                     header="Your purchased books"
                     error="You haven't purchased any books yet"
                     setBookPopupData={setBookPopupData}
                     withProfile
                     {...(!areThereBorrowedBooks && { searchBar: <BookSuggestions {...books} /> })}
                  />
                  <Books
                     books={borrowedBooks}
                     header="Enjoy borrowed books"
                     error="You haven't borrowed any books yet"
                     setBookPopupData={setBookPopupData}
                     withProfile
                     {...(!areThereBoughtBooks && { searchBar: <BookSuggestions {...books} /> })}
                  />
               </>
            ))}
      </UserContent>
   )
}
