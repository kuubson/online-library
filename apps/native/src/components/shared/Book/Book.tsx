import React, { useState } from 'react'
import Spinner from 'react-native-spinkit'
import styled from 'styled-components/native'

import { FALLBACK_IMAGE } from '@online-library/config'

import type { Book as BookType } from '@online-library/core'
import { bookPopupButtonText, t, useBookPopup, useCart } from '@online-library/core'

import { moderateScale } from 'styles'

import { AbsoluteContainer, PopupButton, Text } from '../styled'
import * as Styled from './styled'

import { scalableDimension } from 'utils'

type BookProps = BookType & {
   withCart?: boolean
   withProfile?: boolean
   withPopup?: boolean
   noMargin?: boolean
}

export const Book = ({
   id,
   title,
   author,
   cover,
   price,
   withCart,
   withProfile,
   withPopup,
   noMargin,
}: BookProps) => {
   const [uri, setUri] = useState(cover)

   const [isLoading, setIsLoading] = useState(true)

   const { setBookPopupData } = useBookPopup()

   const { cart, removeFromCart } = useCart()

   const isInCart = cart.includes(id)

   return (
      <BookContainer
         source={{ uri }}
         onLoad={() => setIsLoading(false)}
         onError={() => {
            setIsLoading(true)
            setUri(FALLBACK_IMAGE)
         }}
         noMargin={noMargin}
      >
         {isLoading && (
            <AbsoluteContainer>
               <Spinner color="white" type="Circle" size={moderateScale(25)} />
            </AbsoluteContainer>
         )}
         <Styled.Annotations>
            <Styled.Annotation>{author}</Styled.Annotation>
            <Styled.Annotation withTitle>{title}</Styled.Annotation>
         </Styled.Annotations>
         {withCart ? (
            <Styled.ButtonContainer>
               <PopupButton onPress={() => removeFromCart(id)}>
                  <Text>
                     {t('buttons.remove')} (${price})
                  </Text>
               </PopupButton>
            </Styled.ButtonContainer>
         ) : withProfile ? (
            <Styled.ButtonContainer>
               <PopupButton
                  onPress={() =>
                     setBookPopupData({
                        id,
                        title,
                        author,
                        cover,
                        price,
                        withProfile: true,
                     })
                  }
               >
                  <Text>{t('buttons.open')}</Text>
               </PopupButton>
            </Styled.ButtonContainer>
         ) : !withPopup ? (
            <Styled.ButtonContainer>
               {price && <Text>${price}</Text>}
               <PopupButton
                  onPress={() =>
                     !isInCart &&
                     setBookPopupData({
                        id,
                        title,
                        author,
                        cover,
                        price,
                        withProfile: false,
                     })
                  }
               >
                  <Text>
                     <>
                        {bookPopupButtonText({
                           price,
                           isInCart,
                        })}
                     </>
                  </Text>
               </PopupButton>
            </Styled.ButtonContainer>
         ) : (
            withPopup &&
            price && (
               <Styled.ButtonContainer>
                  <PopupButton>
                     <Text>
                        {t('buttons.price')}: ${price}
                     </Text>
                  </PopupButton>
               </Styled.ButtonContainer>
            )
         )}
      </BookContainer>
   )
}

type BookContainerProps = Pick<BookProps, 'noMargin'>

const BookContainer = styled.ImageBackground<BookContainerProps>`
   height: ${scalableDimension}px;
   margin-top: ${({ noMargin }) => (noMargin ? 0 : moderateScale(30))}px;
`
