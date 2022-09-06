import { useState } from 'react'

import type { Book as BookType } from 'gql'

import { UserContent } from 'components/shared/styled'

import { BookSuggestions, Books } from 'components/shared'

import { BookPopup } from './modules'

import { useProfile } from './hooks'

type ProfileProps = {
   shouldMenuExpand?: boolean
}

export const Profile = ({ shouldMenuExpand }: ProfileProps) => {
   const { loading, boughtBooks, borrowedBooks, setBoughtBooks, setBorrowedBooks } = useProfile()

   const [bookPopupData, setBookPopupData] = useState<BookType>()

   const areThereBoughtBooks = !!boughtBooks.length

   const areThereBorrowedBooks = !!borrowedBooks.length

   return (
      <UserContent shouldMenuExpand={shouldMenuExpand}>
         {bookPopupData && <BookPopup {...bookPopupData} setBookPopupData={setBookPopupData} />}
         {!loading &&
            (!areThereBoughtBooks && !areThereBorrowedBooks ? (
               <Books books={[]} error="You don't have any books yet" />
            ) : areThereBoughtBooks ? (
               <>
                  <Books
                     books={boughtBooks}
                     header="Your purchased books"
                     error="You haven't purchased any books yet"
                     setBookPopupData={setBookPopupData}
                     searchInput={() => (
                        <BookSuggestions
                           freeBooks={borrowedBooks}
                           setFreeBooks={setBorrowedBooks}
                           paidBooks={boughtBooks}
                           setPaidBooks={setBoughtBooks}
                           withProfile
                        />
                     )}
                     withProfile
                     withMarginRight
                  />
                  <Books
                     books={borrowedBooks}
                     header="Enjoy borrowed books"
                     error="You haven't borrowed any books yet"
                     setBookPopupData={setBookPopupData}
                     withProfile
                  />
               </>
            ) : (
               <>
                  <Books
                     books={borrowedBooks}
                     header="Enjoy borrowed books"
                     error="You haven't borrowed any books yet"
                     setBookPopupData={setBookPopupData}
                     searchInput={() => (
                        <BookSuggestions
                           freeBooks={borrowedBooks}
                           setFreeBooks={setBorrowedBooks}
                           paidBooks={boughtBooks}
                           setPaidBooks={setBoughtBooks}
                           withProfile
                        />
                     )}
                     withProfile
                     withMarginRight
                  />
                  <Books
                     books={boughtBooks}
                     header="Your purchased books"
                     error="You haven't purchased any books yet"
                     setBookPopupData={setBookPopupData}
                     withProfile
                  />
               </>
            ))}
      </UserContent>
   )
}
