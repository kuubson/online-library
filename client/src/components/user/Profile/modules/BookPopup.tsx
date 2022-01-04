import { useState, useEffect } from 'react'

import { BookPopupContainer } from 'components/user/Store/modules/BookPopup'

import * as StyledStore from 'components/user/Store/styled'
import * as Styled from '../styled'

import Book from 'components/user/Store/modules/Book'

interface IBookPopup extends IBook {
    setBookPopupData: ReactDispatch<IBook | undefined>
}

const BookPopup = ({ id, title, author, cover, price, setBookPopupData }: IBookPopup) => {
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
            <StyledStore.ContentContainer withFlips>
                <Styled.BookContainer withFlips={isOpened} isRead={isRead}>
                    {pages.map((_, index) => (
                        <Styled.Page
                            key={index}
                            flip={isOpened && (index === currentPage || index <= currentPage)}
                            zIndex={index <= currentPage ? 1 : -index}
                        >
                            {index === 0 ? (
                                <Book
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
                <StyledStore.Content withFlips>
                    <StyledStore.ButtonsContainer>
                        {isOpened ? (
                            <>
                                <StyledStore.Button
                                    onClick={() => setCurrentPage(0)}
                                    notAbsolute
                                    withoutFixedWidth
                                >
                                    First page
                                </StyledStore.Button>
                                <StyledStore.Button
                                    onClick={() => setCurrentPage(currentPage => currentPage - 1)}
                                    notAbsolute
                                    withoutFixedWidth
                                >
                                    Previous page
                                </StyledStore.Button>
                                <StyledStore.Button
                                    onClick={() =>
                                        !isRead && setCurrentPage(currentPage => currentPage + 1)
                                    }
                                    notAbsolute
                                    withoutFixedWidth
                                    withMarginLeft
                                >
                                    Next page
                                </StyledStore.Button>
                            </>
                        ) : (
                            <>
                                <StyledStore.Button
                                    onClick={() => setCurrentPage(currentPage => currentPage + 1)}
                                    notAbsolute
                                    withoutFixedWidth
                                >
                                    Read it
                                </StyledStore.Button>
                                <StyledStore.Button
                                    onClick={() => setBookPopupData(undefined)}
                                    notAbsolute
                                    withoutFixedWidth
                                >
                                    Close
                                </StyledStore.Button>
                            </>
                        )}
                    </StyledStore.ButtonsContainer>
                </StyledStore.Content>
            </StyledStore.ContentContainer>
        </BookPopupContainer>
    )
}

export default BookPopup
