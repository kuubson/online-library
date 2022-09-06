import type { Book as BookType } from 'gql'

import * as Styled from './styled'
import * as SharedStyled from 'components/shared/styled'

import { Book } from 'components/shared'

import { useBookPopup } from './hooks'

import type { SetBookPopupDataFn } from 'types'

type BookPopupProps = BookType & {
   setBookPopupData: SetBookPopupDataFn
}

export const BookPopup = ({
   id,
   title,
   author,
   cover,
   price,
   setBookPopupData,
}: BookPopupProps) => {
   const { handleAdddingToCart, handleBorrowingBook } = useBookPopup({
      id,
      setBookPopupData,
   })
   return (
      <SharedStyled.PopupContainer>
         <Styled.ContentContainer>
            <Book id={id} title={title} author={author} cover={cover} price={price} withPopup />
            <Styled.Content>
               <SharedStyled.Header black>
                  Are you sure you want to
                  {price ? ' add this book to the cart' : ' borrow this book'}?
               </SharedStyled.Header>
               <Styled.ButtonsContainer>
                  <SharedStyled.Button
                     onClick={price ? () => handleAdddingToCart(id) : handleBorrowingBook}
                     notAbsolute
                  >
                     Yes
                  </SharedStyled.Button>
                  <SharedStyled.Button onClick={() => setBookPopupData(undefined)} notAbsolute>
                     No
                  </SharedStyled.Button>
               </Styled.ButtonsContainer>
            </Styled.Content>
         </Styled.ContentContainer>
      </SharedStyled.PopupContainer>
   )
}
