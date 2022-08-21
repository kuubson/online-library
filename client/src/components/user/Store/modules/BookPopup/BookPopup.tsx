import styled from 'styled-components/macro'

import { fadeIn } from 'assets/animations'

import * as Styled from './styled'

import { Book } from 'components/user/Store/modules'
import * as StyledStore from 'components/user/Store/styled'

import { useBookPopup } from './hooks'

type BookPopupProps = BookType & {
   setBookPopupData: ReactDispatch<BookType | undefined>
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
      <BookPopupContainer>
         <Styled.ContentContainer>
            <Book id={id} title={title} author={author} cover={cover} price={price} withPopup />
            <Styled.Content>
               <StyledStore.Header black>
                  Are you sure you want to
                  {price ? ' add this book to the cart' : ' borrow this book'}?
               </StyledStore.Header>
               <Styled.ButtonsContainer>
                  <StyledStore.Button
                     onClick={price ? () => handleAdddingToCart(id) : handleBorrowingBook}
                     notAbsolute
                  >
                     Yes
                  </StyledStore.Button>
                  <StyledStore.Button onClick={() => setBookPopupData(undefined)} notAbsolute>
                     No
                  </StyledStore.Button>
               </Styled.ButtonsContainer>
            </Styled.Content>
         </Styled.ContentContainer>
      </BookPopupContainer>
   )
}

export const BookPopupContainer = styled.div`
   width: 100%;
   height: 100%;
   background: rgba(0, 0, 0, 0.6);
   display: flex;
   justify-content: center;
   align-items: center;
   position: fixed;
   animation: ${fadeIn} 0.5s ease-in-out;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   z-index: 4;
`
