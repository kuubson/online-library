import { t } from '@online-library/core'

import { useProfile } from '@online-library/logic'

import { BookSuggestions, Books } from 'components/shared'

export const Profile = () => {
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
      <>
         {!loading &&
            (!areThereBoughtBooks && !areThereBorrowedBooks ? (
               <Books books={[]} error={t('profile.noBooks')} />
            ) : (
               <>
                  <Books
                     books={boughtBooks}
                     header={t('profile.books.paid.header')}
                     error={t('profile.books.paid.error')}
                     withProfile
                     {...((!areThereBorrowedBooks || shouldShowSearchBar) && {
                        searchBar: <BookSuggestions {...books} />,
                     })}
                  />
                  <Books
                     books={borrowedBooks}
                     header={t('profile.books.free.header')}
                     error={t('profile.books.free.error')}
                     withProfile
                     {...(!areThereBoughtBooks && { searchBar: <BookSuggestions {...books} /> })}
                  />
               </>
            ))}
      </>
   )
}
