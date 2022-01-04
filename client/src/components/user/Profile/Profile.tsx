import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { gql, useQuery } from '@apollo/client'

import { StoreContainer } from 'components/user/Store/Store'

import Books from 'components/user/Store/modules/Books'
import BookPopup from './modules/BookPopup'

import { useBooksSuggestions } from 'components/user/Store/hooks'

type ProfileQuery = {
    borrowedBooks: IBook[]
    boughtBooks: IBook[]
}

const profileQuery = gql`
    {
        boughtBooks {
            id
            title
            author
            cover
        }
        borrowedBooks {
            id
            title
            author
            cover
        }
    }
`

const ProfileContainer = styled(StoreContainer)``

interface IProfile {
    shouldMenuExpand?: boolean
}

const Profile = ({ shouldMenuExpand }: IProfile) => {
    const { loading: isLoading, data: profile } = useQuery<ProfileQuery>(profileQuery)
    const [boughtBooks, setBoughtBooks] = useState<IBook[]>([])
    const [borrowedBooks, setBorrowedBooks] = useState<IBook[]>([])
    const [bookPopupData, setBookPopupData] = useState<IBook>()
    const areThereBoughtBooks = !!boughtBooks.length
    const areThereBorrowedBooks = !!borrowedBooks.length
    useEffect(() => {
        setTimeout(() => {
            if (profile) {
                setBoughtBooks(profile.boughtBooks)
                setBorrowedBooks(profile.borrowedBooks)
            }
        }, 0)
    }, [profile])
    const { renderBooksSuggestionsInput } = useBooksSuggestions({
        freeBooks: borrowedBooks,
        setFreeBooks: setBorrowedBooks,
        paidBooks: boughtBooks,
        setPaidBooks: setBoughtBooks,
        withProfile: true
    })
    return (
        <ProfileContainer shouldMenuExpand={shouldMenuExpand}>
            {bookPopupData && <BookPopup {...bookPopupData} setBookPopupData={setBookPopupData} />}
            {!isLoading &&
                (!areThereBoughtBooks && !areThereBorrowedBooks ? (
                    <Books books={[]} error="You don't have any books yet" />
                ) : areThereBoughtBooks ? (
                    <>
                        <Books
                            books={boughtBooks}
                            header="Your purchased books"
                            error="You haven't purchased any books yet"
                            setBookPopupData={setBookPopupData}
                            renderBooksSuggestionsInput={renderBooksSuggestionsInput}
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
                            renderBooksSuggestionsInput={renderBooksSuggestionsInput}
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
