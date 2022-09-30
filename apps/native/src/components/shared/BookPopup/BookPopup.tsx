import React from 'react'
import styled from 'styled-components/native'

import { t, useBookPopup } from '@online-library/core'

import { Header, PopupButton, Text } from '../styled'
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
               <Book
                  id={id}
                  title={title}
                  author={author}
                  cover={cover}
                  price={price}
                  withPopup
                  noMargin
               />
               <Styled.Buttons>
                  {!withProfile && (
                     <>
                        <Header black>
                           {price ? t('bookPopup.confirmBuying') : t('bookPopup.confirmBorrowing')}
                        </Header>
                        <PopupButton onPress={price ? () => addToCart(id) : borrowBook}>
                           <Text>{t('buttons.confirm')}</Text>
                        </PopupButton>
                     </>
                  )}
                  <PopupButton onPress={resetBookPopup}>
                     <Text>{withProfile ? t('buttons.close') : t('buttons.cancel')}</Text>
                  </PopupButton>
               </Styled.Buttons>
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
