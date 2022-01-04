import React, { useState, useEffect } from 'react'

import { BookPopupContainer } from 'components/user/Store/composed/BookPopup'

import UserStoreDashboard from 'components/user/Store/styled'
import * as Styled from '../styled'

import UserStoreComposed from 'components/user/Store/composed'

interface IBookPopup extends IBook {
    setBookPopupData: ReactDispatch<IBook | undefined>
}

const BookPopup: React.FC<IBookPopup> = ({ id, title, author, cover, price, setBookPopupData }) => {
    const [pages] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    const [currentPage, setCurrentPage] = useState(0)
    const [isOpened, setIsOpened] = useState(false)
    const [isRead, setIsRead] = useState(false)
    useEffect(() => {
        setIsOpened(currentPage > 0)
        setIsRead(currentPage >= pages.length - 1)
    }, [currentPage])
    return (
        <BookPopupContainer>
            <UserStoreDashboard.ContentContainer withFlips>
                <Styled.BookContainer withFlips={isOpened} isRead={isRead}>
                    {pages.map((_, index) => (
                        <Styled.Page
                            key={index}
                            flip={isOpened && (index === currentPage || index <= currentPage)}
                            zIndex={index <= currentPage ? 1 : -index}
                        >
                            {index === 0 ? (
                                <UserStoreComposed.Book
                                    id={id}
                                    title={title}
                                    author={author}
                                    cover={cover}
                                    price={price}
                                    withPopup
                                    withFlips
                                />
                            ) : (
                                <Styled.PageContent>FRONT {index}</Styled.PageContent>
                            )}
                            <Styled.PageContent back>BACK {index}</Styled.PageContent>
                        </Styled.Page>
                    ))}
                </Styled.BookContainer>
                <UserStoreDashboard.Content withFlips>
                    <UserStoreDashboard.ButtonsContainer>
                        {isOpened ? (
                            <>
                                <UserStoreDashboard.Button
                                    onClick={() => setCurrentPage(0)}
                                    notAbsolute
                                    withoutFixedWidth
                                >
                                    First page
                                </UserStoreDashboard.Button>
                                <UserStoreDashboard.Button
                                    onClick={() => setCurrentPage(currentPage => currentPage - 1)}
                                    notAbsolute
                                    withoutFixedWidth
                                >
                                    Previous page
                                </UserStoreDashboard.Button>
                                <UserStoreDashboard.Button
                                    onClick={() =>
                                        !isRead && setCurrentPage(currentPage => currentPage + 1)
                                    }
                                    notAbsolute
                                    withoutFixedWidth
                                    withMarginLeft
                                >
                                    Next page
                                </UserStoreDashboard.Button>
                            </>
                        ) : (
                            <>
                                <UserStoreDashboard.Button
                                    onClick={() => setCurrentPage(currentPage => currentPage + 1)}
                                    notAbsolute
                                    withoutFixedWidth
                                >
                                    Read it
                                </UserStoreDashboard.Button>
                                <UserStoreDashboard.Button
                                    onClick={() => setBookPopupData(undefined)}
                                    notAbsolute
                                    withoutFixedWidth
                                >
                                    Close
                                </UserStoreDashboard.Button>
                            </>
                        )}
                    </UserStoreDashboard.ButtonsContainer>
                </UserStoreDashboard.Content>
            </UserStoreDashboard.ContentContainer>
        </BookPopupContainer>
    )
}

export default BookPopup
