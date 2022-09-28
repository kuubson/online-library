import { useBookPopup } from '@online-library/core'

import { useStore } from '@online-library/logic'

import { UserContent } from 'components/shared/styled'

import { BookPopup, BookSuggestions, Books } from 'components/shared'

export const Store = () => {
   const {
      loading,
      freeBooks,
      paidBooks,
      hasMoreFreeBooks,
      hasMorePaidBooks,
      areThereFreeBooks,
      areTherePaidBooks,
      shouldShowSearchBar,
      books,
      getMoreBooks,
   } = useStore()

   const { showBookPopup } = useBookPopup()

   return (
      <UserContent>
         {showBookPopup && <BookPopup />}
         {!loading &&
            (!areThereFreeBooks && !areTherePaidBooks ? (
               <Books books={[]} error="There are no books in the library right now" />
            ) : (
               <>
                  <Books
                     books={freeBooks}
                     header="Find here awesome books"
                     error="There are no free books in the library right now"
                     hasMore={hasMoreFreeBooks}
                     loadMore={() => getMoreBooks(freeBooks.length, 0)}
                     {...((!areTherePaidBooks || shouldShowSearchBar) && {
                        searchBar: <BookSuggestions {...books} />,
                     })}
                  />
                  <Books
                     books={paidBooks}
                     header="Choose some paid books"
                     error="There are no paid books in the library right now"
                     hasMore={hasMorePaidBooks}
                     loadMore={() => getMoreBooks(0, paidBooks.length)}
                     {...(!areThereFreeBooks && { searchBar: <BookSuggestions {...books} /> })}
                  />
               </>
            ))}
      </UserContent>
   )
}
