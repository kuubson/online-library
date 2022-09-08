import { useState } from 'react'

import type { Book } from 'gql'

import { UserContent } from 'components/shared/styled'

import { BookSuggestions, Books } from 'components/shared'

import { BookPopup } from './modules'

import { useStore } from './hooks'

type StoreProps = {
   shouldMenuExpand?: boolean
}

export const Store = ({ shouldMenuExpand }: StoreProps) => {
   const {
      loading,
      freeBooks,
      paidBooks,
      hasMoreFreeBooks,
      hasMorePaidBooks,
      setFreeBooks,
      setPaidBooks,
      getMoreBooks,
   } = useStore()

   const [bookPopupData, setBookPopupData] = useState<Book>()

   const books = {
      freeBooks,
      setFreeBooks,
      paidBooks,
      setPaidBooks,
   }

   const areThereFreeBooks = !!freeBooks.length
   const areTherePaidBooks = !!paidBooks.length

   return (
      <UserContent shouldMenuExpand={shouldMenuExpand}>
         {bookPopupData && <BookPopup {...bookPopupData} setBookPopupData={setBookPopupData} />}
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
                     setBookPopupData={setBookPopupData}
                     loadMore={() => getMoreBooks(freeBooks.length, 0)}
                     {...(!areTherePaidBooks && { searchBar: <BookSuggestions {...books} /> })}
                  />
                  <Books
                     books={paidBooks}
                     header="Choose some paid books"
                     error="There are no paid books in the library right now"
                     hasMore={hasMorePaidBooks}
                     setBookPopupData={setBookPopupData}
                     loadMore={() => getMoreBooks(0, paidBooks.length)}
                     {...(!areThereFreeBooks && { searchBar: <BookSuggestions {...books} /> })}
                  />
               </>
            ))}
      </UserContent>
   )
}
