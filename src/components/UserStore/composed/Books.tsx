import React from 'react'
import styled, { css } from 'styled-components/macro'

import Dashboard from '../styled/Dashboard'

import Composed from '.'

import { IBook } from '../UserStore'

interface IProps {
    books: IBook[]
    header?: string
    error: string
    setBookPopupData?: React.Dispatch<React.SetStateAction<IBook | undefined>>
    renderBooksSuggestionsInput?: () => JSX.Element
    withCart?: boolean
    withProfile?: boolean
    withMarginRight?: boolean
}

interface ISCProps {
    withMarginRight?: boolean
    empty?: boolean
}

const BooksContainer = styled.div`
    width: 55%;
    margin-top: 20px;
    @media (max-width: 800px) {
        width: 100%;
    }
    ${({ withMarginRight }: ISCProps) =>
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
        empty &&
        css`
            margin-top: 0px !important;
        `}
`

const Books: React.FC<IProps> = ({
    books,
    error,
    header,
    setBookPopupData,
    renderBooksSuggestionsInput,
    withCart,
    withProfile,
    withMarginRight
}) => {
    const areThereBooks = books.length > 0
    return (
        <BooksContainer withMarginRight={withMarginRight} empty={!areThereBooks}>
            {areThereBooks && (
                <Dashboard.HeaderContainer>
                    {header && (
                        <Dashboard.Header withMoreMarginBottom={!!renderBooksSuggestionsInput}>
                            {header}
                        </Dashboard.Header>
                    )}
                    {renderBooksSuggestionsInput && renderBooksSuggestionsInput()}
                </Dashboard.HeaderContainer>
            )}
            <Dashboard.Books empty={!areThereBooks}>
                {areThereBooks ? (
                    books.map(({ id, title, author, cover, price }) => (
                        <Composed.Book
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
                    <Dashboard.Warning>{error}</Dashboard.Warning>
                )}
            </Dashboard.Books>
        </BooksContainer>
    )
}

export default Books
