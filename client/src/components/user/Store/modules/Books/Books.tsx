import styled, { css } from 'styled-components'

import { fadeIn } from 'assets/animations'

import * as Styled from './styled'

import * as StyledStore from '../../styled'
import Book from '../Book/Book'

type StyledProps = {
   withMarginRight?: boolean
   empty?: boolean
   fullWidth?: boolean
}

const BooksContainer = styled.div<StyledProps>`
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
   searchInput?: () => JSX.Element
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
   searchInput,
   loadMore,
   withCart,
   withProfile,
   withMarginRight,
   fullWidth,
   withoutInput,
}: IBooks) => {
   const areThereBooks = !!books.length
   return (
      <BooksContainer
         withMarginRight={withMarginRight}
         empty={!areThereBooks}
         fullWidth={fullWidth}
      >
         {areThereBooks && (
            <StyledStore.HeaderContainer withoutInput={withoutInput}>
               {header && (
                  <StyledStore.Header
                     withMoreMarginBottom={!!searchInput}
                     withPaddingRight={!!searchInput}
                  >
                     {header}
                  </StyledStore.Header>
               )}
               {searchInput && searchInput()}
            </StyledStore.HeaderContainer>
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
               <StyledStore.Button onClick={loadMore} notAbsolute withLoadMore>
                  Load more
               </StyledStore.Button>
            )}
         </Styled.Books>
      </BooksContainer>
   )
}

export default Books
