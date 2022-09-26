import { useStore } from '@online-library/ui'

import { BookSuggestions, Books } from 'components/shared'

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

   return (
      <>
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
      </>
   )
}
