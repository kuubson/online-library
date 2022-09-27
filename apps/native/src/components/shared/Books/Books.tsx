import React from 'react'
import styled, { css } from 'styled-components/native'

import type { _BooksProps } from '@online-library/core'

import { moderateScale } from 'styles'

import { Header, Text } from '../styled'
import * as Styled from './styled'

import { Book } from 'components/shared/Book/Book'

export const Books = ({
   books,
   error,
   header,
   hasMore,
   loadMore,
   searchBar,
   withCart,
   withProfile,
}: _BooksProps) => {
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
            {areThereBooks
               ? books.map(({ id, title, author, cover, price }, index) => (
                    <Book
                       key={id}
                       id={id}
                       title={title}
                       author={author}
                       cover={cover}
                       price={price}
                       withCart={withCart}
                       withProfile={withProfile}
                       isFirst={index === 0}
                    />
                 ))
               : !withProfile && <Styled.Warning>{error}</Styled.Warning>}
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
   margin: 0px ${moderateScale(30)}px ${moderateScale(30)}px ${moderateScale(30)}px;
   justify-content: center;
   align-items: stretch;
   flex: 1;
   ${({ withoutBooks }) =>
      withoutBooks
         ? css`
              align-items: center;
              order: 2;
           `
         : null}
`
