import React, { useEffect, useState } from 'react'

import { BookPopupContainer } from 'components/UserStore/composed/BookPopup'
import USDashboard from 'components/UserStore/styled/Dashboard'
import Dashboard from '../styled/Dashboard'

import USComposed from 'components/UserStore/composed'

const BookPopup = ({ id, title, author, cover, price, setBookPopupData }) => {
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
            <USDashboard.ContentContainer withFlips>
                <Dashboard.BookContainer withFlips={isOpened} isRead={isRead}>
                    {pages.map((_, index) => (
                        <Dashboard.Page
                            key={index}
                            flip={isOpened && (index === currentPage || index <= currentPage)}
                            zIndex={index <= currentPage ? 1 : -index}
                        >
                            {index === 0 ? (
                                <USComposed.Book
                                    id={id}
                                    title={title}
                                    author={author}
                                    cover={cover}
                                    price={price}
                                    withPopup
                                    withFlips
                                />
                            ) : (
                                <Dashboard.PageContent>FRONT {index}</Dashboard.PageContent>
                            )}
                            <Dashboard.PageContent back>BACK {index}</Dashboard.PageContent>
                        </Dashboard.Page>
                    ))}
                </Dashboard.BookContainer>
                <USDashboard.Content withFlips>
                    <USDashboard.ButtonsContainer>
                        {isOpened ? (
                            <>
                                <USDashboard.Button
                                    onClick={() => setCurrentPage(0)}
                                    notAbsolute
                                    withoutFixedWidth
                                >
                                    First page
                                </USDashboard.Button>
                                <USDashboard.Button
                                    onClick={() => setCurrentPage(currentPage => currentPage - 1)}
                                    notAbsolute
                                    withoutFixedWidth
                                >
                                    Previous page
                                </USDashboard.Button>
                                <USDashboard.Button
                                    onClick={() =>
                                        !isRead && setCurrentPage(currentPage => currentPage + 1)
                                    }
                                    notAbsolute
                                    withoutFixedWidth
                                    withMarginLeft
                                >
                                    Next page
                                </USDashboard.Button>
                            </>
                        ) : (
                            <>
                                <USDashboard.Button
                                    onClick={() => setCurrentPage(currentPage => currentPage + 1)}
                                    notAbsolute
                                    withoutFixedWidth
                                >
                                    Read it
                                </USDashboard.Button>
                                <USDashboard.Button
                                    onClick={() => setBookPopupData(undefined)}
                                    notAbsolute
                                    withoutFixedWidth
                                >
                                    Close
                                </USDashboard.Button>
                            </>
                        )}
                    </USDashboard.ButtonsContainer>
                </USDashboard.Content>
            </USDashboard.ContentContainer>
        </BookPopupContainer>
    )
}

export default BookPopup
