import { useState } from 'react'
import styled from 'styled-components'

import { StoreContainer } from 'components/user/Store/Store'
import BookSuggestions from 'components/user/Store/modules/BookSuggestions/BookSuggestions'
import Books from 'components/user/Store/modules/Books/Books'

import { useProfile } from './hooks'

import BookPopup from './modules/BookPopup/BookPopup'

const ProfileContainer = styled(StoreContainer)``

interface IProfile {
   shouldMenuExpand?: boolean
}

const Profile = ({ shouldMenuExpand }: IProfile) => {
   const { loading, boughtBooks, borrowedBooks, setBoughtBooks, setBorrowedBooks } = useProfile()
   const [bookPopupData, setBookPopupData] = useState<IBook>()
   const areThereBoughtBooks = !!boughtBooks.length
   const areThereBorrowedBooks = !!borrowedBooks.length
   return (
      <ProfileContainer shouldMenuExpand={shouldMenuExpand}>
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
      </ProfileContainer>
   )
}

export default Profile
