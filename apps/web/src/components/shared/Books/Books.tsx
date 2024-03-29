import styled, { css } from 'styled-components'

import type { _BooksProps } from '@online-library/core'
import { t } from '@online-library/core'

import { fadeIn, queries } from 'styles'
import { Button, Header, HeaderContainer, Warning } from 'styles/styled'

import * as Styled from './styled'

import { Book } from 'components/shared'

type BooksProps = _BooksProps & {
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
   withMarginRight,
   fullWidth,
   withoutInput,
}: BooksProps) => {
   const areThereBooks = !!books.length
   return (
      <BooksContainer
         withMarginRight={withMarginRight}
         empty={!areThereBooks}
         fullWidth={fullWidth}
      >
         {areThereBooks && (
            <HeaderContainer withoutInput={withoutInput}>
               {header && (
                  <Header withMoreMarginBottom={!!searchBar} withPaddingRight={!!searchBar}>
                     {header}
                  </Header>
               )}
               {searchBar}
            </HeaderContainer>
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
                     withCart={withCart}
                     withProfile={withProfile}
                  />
               ))
            ) : (
               <Warning>{error}</Warning>
            )}
            {books.length >= 10 && hasMore && !withCart && (
               <Button onClick={loadMore} notAbsolute withLoadMore>
                  {t('buttons.loadMore')}
               </Button>
            )}
         </Styled.Books>
      </BooksContainer>
   )
}

type BooksContainerProps = {
   withMarginRight?: boolean
   empty?: boolean
   fullWidth?: boolean
}

const BooksContainer = styled.div<BooksContainerProps>`
   width: 55%;
   margin-top: 20px;
   animation: ${fadeIn} 0.4s ease-in-out;
   @media ${queries.largeTablet} {
      width: 100%;
   }
   ${({ withMarginRight }) =>
      withMarginRight
         ? css`
              margin-right: 20px;
              @media ${queries.largeTablet} {
                 margin-right: 0px;
              }
           `
         : null}
   ${({ empty }) =>
      empty
         ? css`
              margin-top: 0px !important;
              order: 2;
           `
         : css`
              margin-right: 20px;
              &:last-child {
                 margin-right: 0px;
              }
           `}
    ${({ fullWidth }) =>
      fullWidth
         ? css`
              width: 100%;
           `
         : null}
`
