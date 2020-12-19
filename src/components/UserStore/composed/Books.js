import React from 'react'
import styled, { css } from 'styled-components/macro'

import animations from 'assets/animations'

import Dashboard from '../styled/Dashboard'

import Composed from '.'

const BooksContainer = styled.div`
    width: 55%;
    margin-top: 20px;
    animation: ${animations.fadeIn} 0.4s ease-in-out;
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
        empty &&
        css`
            margin-top: 0px !important;
        `}
    ${({ fullWidth }) =>
        fullWidth &&
        css`
            width: 100%;
        `}
`

const Books = ({
    books,
    error,
    header,
    setBookPopupData,
    renderBooksSuggestionsInput,
    withCart,
    withProfile,
    withMarginRight,
    fullWidth,
    withoutInput
}) => {
    const areThereBooks = books.length > 0
    return (
        <BooksContainer
            withMarginRight={withMarginRight}
            empty={!areThereBooks}
            fullWidth={fullWidth}
        >
            {areThereBooks && (
                <Dashboard.HeaderContainer withoutInput={withoutInput}>
                    {header && (
                        <Dashboard.Header
                            withMoreMarginBottom={!!renderBooksSuggestionsInput}
                            withPaddingRight={!!renderBooksSuggestionsInput}
                        >
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
