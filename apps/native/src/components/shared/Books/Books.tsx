import React from 'react'
import styled, { css } from 'styled-components/native'

import type { _BooksProps } from '@online-library/core'
import { t } from '@online-library/core'

import { moderateScale } from 'styles'

import { Header, Text, Warning } from '../styled'
import * as Styled from './styled'

import { Book } from '../Book/Book'

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

   if (!areThereBooks && withCart === undefined) {
      return null
   }

   return (
      <BooksContainer areThereBooks={areThereBooks}>
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
                     noMargin={index === 0}
                  />
               ))
            ) : (
               <Warning>{error}</Warning>
            )}
            {books.length >= 10 && hasMore && !withCart && (
               <Styled.LoadMoreButton onPress={loadMore}>
                  <Text>{t('buttons.loadMore')}</Text>
               </Styled.LoadMoreButton>
            )}
         </Styled.Content>
      </BooksContainer>
   )
}

type BooksContainerProps = {
   areThereBooks: boolean
}

const BooksContainer = styled.View<BooksContainerProps>`
   margin: 0px ${moderateScale(15)}px ${moderateScale(30)}px ${moderateScale(15)}px;
   justify-content: center;
   align-items: stretch;
   flex: 1;
   ${({ areThereBooks }) =>
      !areThereBooks
         ? css`
              align-items: center;
           `
         : null}
`
