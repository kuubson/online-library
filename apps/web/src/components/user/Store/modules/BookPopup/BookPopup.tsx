import type { Book as BookType } from 'gql'

import * as Styled from './styled'
import { Button, Header, PopupContainer } from 'components/shared/styled'

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
      <PopupContainer>
         <Styled.ContentContainer>
            <Book id={id} title={title} author={author} cover={cover} price={price} withPopup />
            <Styled.Content>
               <Header black>
                  Confirm
                  {price ? ' adding this book to the cart' : ' borrowing this book'}
               </Header>
               <Styled.ButtonsContainer>
                  <Button
                     onClick={price ? () => handleAdddingToCart(id) : handleBorrowingBook}
                     notAbsolute
                  >
                     Confirm
                  </Button>
                  <Button onClick={() => setBookPopupData(undefined)} notAbsolute>
                     Cancel
                  </Button>
               </Styled.ButtonsContainer>
            </Styled.Content>
         </Styled.ContentContainer>
      </PopupContainer>
   )
}
