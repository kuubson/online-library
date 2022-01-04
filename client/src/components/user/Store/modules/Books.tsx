import styled, { css } from 'styled-components'

import Book from './Book'

import * as Styled from '../styled'

import { fadeIn } from 'assets/animations'

type Props = {
    withMarginRight?: boolean
    empty?: boolean
    fullWidth?: boolean
}

const BooksContainer = styled.div<Props>`
    width: 55%;
    margin-top: 20px;
    animation: ${fadeIn} 0.4s ease-in-out;
    @media (max-width: 800px) {
        width: 100%;
    }
    ${({ withMarginRight }) =>
        withMarginRight
            ? css`
                  margin-right: 20px;
                  @media (max-width: 800px) {
                      margin-right: 0px;
                  }
              `
            : css`
                  @media (max-width: 800px) {
                      margin-top: 35px;
                  }
              `}
    ${({ empty }) =>
        empty
            ? css`
                  margin-top: 0px !important;
              `
            : null}
    ${({ fullWidth }) =>
        fullWidth
            ? css`
                  width: 100%;
              `
            : null}
`

interface IBooks {
    books: IBook[]
    error: string
    header?: string
    hasMore?: boolean
    setBookPopupData?: ReactDispatch<IBook | undefined>

    renderBooksSuggestionsInput?: () => JSX.Element
    loadMore?: () => void
    withCart?: boolean
    withProfile?: boolean
    withMarginRight?: boolean
    fullWidth?: boolean
    withoutInput?: boolean
}

const Books = ({
    books,
    error,
    header,
    hasMore,
    setBookPopupData,
    renderBooksSuggestionsInput,
    loadMore,
    withCart,
    withProfile,
    withMarginRight,
    fullWidth,
    withoutInput
}: IBooks) => {
    const areThereBooks = !!books.length
    return (
        <BooksContainer
            withMarginRight={withMarginRight}
            empty={!areThereBooks}
            fullWidth={fullWidth}
        >
            {areThereBooks && (
                <Styled.HeaderContainer withoutInput={withoutInput}>
                    {header && (
                        <Styled.Header
                            withMoreMarginBottom={!!renderBooksSuggestionsInput}
                            withPaddingRight={!!renderBooksSuggestionsInput}
                        >
                            {header}
                        </Styled.Header>
                    )}
                    {renderBooksSuggestionsInput && renderBooksSuggestionsInput()}
                </Styled.HeaderContainer>
            )}
            <Styled.Books empty={!areThereBooks}>
                {areThereBooks ? (
                    books.map(({ id, title, author, cover, price }) => (
                        <Book
                            key={id}
                            id={id}
                            title={title}
                            author={author}
                            cover={cover}
                            price={price}
                            setBookPopupData={setBookPopupData}
                            withCart={withCart}
                            withProfile={withProfile}
                        />
                    ))
                ) : (
                    <Styled.Warning>{error}</Styled.Warning>
                )}
                {books.length >= 10 && hasMore && !withCart && (
                    <Styled.Button notAbsolute withLoadMore onClick={loadMore}>
                        Load more
                    </Styled.Button>
                )}
            </Styled.Books>
        </BooksContainer>
    )
}

export default Books
