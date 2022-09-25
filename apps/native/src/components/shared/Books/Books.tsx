import React from 'react'
import styled from 'styled-components/native'

import type { Book as BookType } from '@online-library/core'

import { Header } from '../BookPopup/styled'
import { Text } from '../styled'
import * as Styled from './styled'

import { Book } from 'components/shared/Book/Book'

type BooksProps = {
   books: BookType[]
   error: string
   header?: string
   hasMore?: boolean
   loadMore?: () => void
   searchBar?: JSX.Element
   withCart?: boolean
   withProfile?: boolean
   withMarginRight?: boolean
   fullWidth?: boolean
   withoutInput?: boolean
}

export const Books = ({
   books,
   error,
   header,
   hasMore,
   loadMore,
   searchBar,
   withCart,
   withProfile,
}: BooksProps) => {
   const areThereBooks = !!books.length
   return (
      <BooksContainer withoutBooks={!areThereBooks}>
         {areThereBooks && (
            <>
               {header && <Header>{header}</Header>}
               {searchBar}
            </>
         )}
         <Styled.Content>
            {areThereBooks ? (
               books.map(({ id, title, author, cover, price }, index) => (
                  <Book
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
               <Styled.Warning>{error}</Styled.Warning>
            )}
            {books.length >= 10 && hasMore && !withCart && (
               <Styled.LoadMoreButton onPress={loadMore}>
                  <Text>Load more</Text>
               </Styled.LoadMoreButton>
            )}
         </Styled.Content>
      </BooksContainer>
   )
}

type BooksContainerProps = {
   withoutBooks: boolean
}

const BooksContainer = styled.View<BooksContainerProps>`
   justify-content: center;
   align-items: ${({ withoutBooks }) => (withoutBooks ? 'center' : 'stretch')};
   flex: 1;
`
