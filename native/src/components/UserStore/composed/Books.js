import React from 'react'
import styled from 'styled-components'

import Dashboard from '../styled/Dashboard'

import Composed from '.'

const BooksContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: ${({ withoutBooks }) => (withoutBooks ? 'center' : 'stretch')};
`

const Books = ({
    books,
    error,
    header,
    renderBooksSuggestionsInput,
    loadMore,
    hasMore,
    withCart,
    withProfile
}) => {
    const areThereBooks = books.length > 0
    return (
        <BooksContainer withoutBooks={!areThereBooks}>
            {areThereBooks && (
                <>
                    {header && <Dashboard.Header>{header}</Dashboard.Header>}
                    {renderBooksSuggestionsInput && renderBooksSuggestionsInput()}
                </>
            )}
            <Dashboard.Books>
                {areThereBooks ? (
                    books.map(({ id, title, author, cover, price }, index) => (
                        <Composed.Book
                            key={id}
                            id={id}
                            title={title}
                            author={author}
                            cover={cover}
                            price={price}
                            withCart={withCart}
                            withProfile={withProfile}
                            first={index === 0}
                        />
                    ))
                ) : (
                    <Dashboard.Warning>{error}</Dashboard.Warning>
                )}
                {books.length >= 10 && hasMore && !withCart && (
                    <Dashboard.LoadMoreButton onPress={loadMore}>
                        <Dashboard.ButtonText>Load more</Dashboard.ButtonText>
                    </Dashboard.LoadMoreButton>
                )}
            </Dashboard.Books>
        </BooksContainer>
    )
}

export default Books
