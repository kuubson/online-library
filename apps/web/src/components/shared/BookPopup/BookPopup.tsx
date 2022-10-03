import { t, useBookPopup } from '@online-library/core'

import * as Styled from './styled'
import { Button, Header, PopupContainer } from 'components/shared/styled'

import { Book } from 'components/shared'

export const BookPopup = () => {
   const { id, title, author, cover, price, resetBookPopup, borrowBook, addToCart } = useBookPopup()
   return (
      <PopupContainer>
         <Styled.ContentContainer>
            <Book id={id} title={title} author={author} cover={cover} price={price} withPopup />
            <Styled.Content>
               <Header black>
                  {price ? t('bookPopup.confirmBuying') : t('bookPopup.confirmBorrowing')}
               </Header>
               <Styled.ButtonsContainer>
                  <Button onClick={price ? () => addToCart(id) : borrowBook} notAbsolute>
                     {t('buttons.confirm')}
                  </Button>
                  <Button onClick={resetBookPopup} notAbsolute>
                     {t('buttons.cancel')}
                  </Button>
               </Styled.ButtonsContainer>
            </Styled.Content>
         </Styled.ContentContainer>
      </PopupContainer>
   )
}
