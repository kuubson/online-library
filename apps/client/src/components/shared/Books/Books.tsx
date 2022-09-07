import styled, { css } from 'styled-components/macro'

import type { Book as BookType } from 'gql'

import { queries } from 'styles'

import { fadeIn } from 'assets/animations'

import * as Styled from './styled'
import { Button, Header, HeaderContainer, Warning } from 'components/shared/styled'

import { Book } from 'components/shared'

type BooksProps = {
   books: BookType[]
   error: string
   header?: string
   hasMore?: boolean
   setBookPopupData?: ReactDispatch<BookType | undefined>
   searchInput?: () => JSX.Element
   loadMore?: () => void
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
   setBookPopupData,
   searchInput,
   loadMore,
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
                  <Header withMoreMarginBottom={!!searchInput} withPaddingRight={!!searchInput}>
                     {header}
                  </Header>
               )}
               {searchInput && searchInput()}
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
                     setBookPopupData={setBookPopupData}
                     withCart={withCart}
                     withProfile={withProfile}
                  />
               ))
            ) : (
               <Warning>{error}</Warning>
            )}
            {books.length >= 10 && hasMore && !withCart && (
               <Button onClick={loadMore} notAbsolute withLoadMore>
                  Load more
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
         : css`
              @media ${queries.largeTablet} {
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
