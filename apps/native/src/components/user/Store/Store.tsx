import { t } from '@online-library/core'

import { useStore } from '@online-library/logic'

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
               <Books books={[]} error={t('store.noBooks')} />
            ) : (
               <>
                  <Books
                     books={freeBooks}
                     header={t('profile.books.free.header')}
                     error={t('profile.books.free.error')}
                     hasMore={hasMoreFreeBooks}
                     loadMore={() => getMoreBooks(freeBooks.length, 0)}
                     {...((!areTherePaidBooks || shouldShowSearchBar) && {
                        searchBar: <BookSuggestions {...books} />,
                     })}
                  />
                  <Books
                     books={paidBooks}
                     header={t('profile.books.paid.header')}
                     error={t('profile.books.paid.error')}
                     hasMore={hasMorePaidBooks}
                     loadMore={() => getMoreBooks(0, paidBooks.length)}
                     {...(!areThereFreeBooks && { searchBar: <BookSuggestions {...books} /> })}
                  />
               </>
            ))}
      </>
   )
}
