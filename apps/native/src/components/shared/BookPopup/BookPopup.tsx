// import { Actions } from 'react-native-router-flux'
import React from 'react'
import styled from 'styled-components/native'

import { useBookPopup } from '@online-library/core'

import { PopupButton, Text } from '../styled'
import * as Styled from './styled'

import { Book } from 'components/shared/Book/Book'

export const BookPopup = () => {
   const { id, title, author, cover, price, withProfile, resetBookPopup, borrowBook, addToCart } =
      useBookPopup()
   return (
      <BookPopupContainer>
         <Styled.ScrollView
            contentContainerStyle={{
               flexGrow: 1,
               justifyContent: 'center',
               alignItems: 'center',
            }}
         >
            <Styled.Content>
               <Book id={id} title={title} author={author} cover={cover} price={price} withPopup />
               {!withProfile && (
                  <>
                     <Styled.Header black>
                        Confirm
                        {price ? ' adding this book to the cart' : ' borrowing this book'}
                     </Styled.Header>
                     <PopupButton onPress={price ? () => addToCart(id) : borrowBook}>
                        <Text>Confirm</Text>
                     </PopupButton>
                  </>
               )}
               <PopupButton onPress={resetBookPopup}>
                  <Text>{withProfile ? 'Close' : 'Cancel'}</Text>
               </PopupButton>
            </Styled.Content>
         </Styled.ScrollView>
      </BookPopupContainer>
   )
}

export const BookPopupContainer = styled.View`
   background: rgba(0, 0, 0, 0.5);
   position: absolute;
   top: 0px;
   right: 0px;
   bottom: 0px;
   left: 0px;
   z-index: 1;
   elevation: 1;
`
