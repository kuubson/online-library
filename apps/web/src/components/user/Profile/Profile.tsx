import { useBookPopup } from '@online-library/core'

import { useProfile } from '@online-library/ui'

import { UserContent } from 'components/shared/styled'

import { BookSuggestions, Books } from 'components/shared'

import { BookPreview } from './modules'

export const Profile = () => {
   const { showBookPopup } = useBookPopup()

   const {
      loading,
      boughtBooks,
      borrowedBooks,
      areThereBoughtBooks,
      areThereBorrowedBooks,
      shouldShowSearchBar,
      books,
   } = useProfile()

   return (
      <UserContent>
         {showBookPopup && <BookPreview />}
         {!loading &&
            (!areThereBoughtBooks && !areThereBorrowedBooks ? (
               <Books books={[]} error="Go to store to get free books or buy some" />
            ) : (
               <>
                  <Books
                     books={boughtBooks}
                     header="Premium books"
                     error="No premium books"
                     withProfile
                     {...((!areThereBorrowedBooks || shouldShowSearchBar) && {
                        searchBar: <BookSuggestions {...books} />,
                     })}
                  />
                  <Books
                     books={borrowedBooks}
                     header="Enjoy borrowed books"
                     error="No borrowed books"
                     withProfile
                     {...(!areThereBoughtBooks && { searchBar: <BookSuggestions {...books} /> })}
                  />
               </>
            ))}
      </UserContent>
   )
}
