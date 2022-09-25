import React, { useState } from 'react'
import { Dimensions } from 'react-native'
import Spinner from 'react-native-spinkit'
import styled from 'styled-components/native'

import { FALLBACK_IMAGE } from '@online-library/config'

import type { Book as BookType } from '@online-library/core'
import { useBookPopup, useCart } from '@online-library/core'

import { scale } from 'styles'

import { AbsoluteContainer, PopupButton, Text } from '../styled'
import * as Styled from './styled'

const window = Dimensions.get('window') // TODO: to var

type BookProps = BookType & {
   withCart?: boolean
   withProfile?: boolean
   withPopup?: boolean
   first: boolean
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
   first,
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
         first={first}
      >
         {isLoading && (
            <AbsoluteContainer>
               <Spinner color="white" type="Circle" size={scale(25)} />
            </AbsoluteContainer>
         )}
         <Styled.Annotations>
            <Styled.Annotation>{author}</Styled.Annotation>
            <Styled.Annotation withTitle>{title}</Styled.Annotation>
         </Styled.Annotations>
         {withCart ? (
            <Styled.ButtonContainer>
               <PopupButton onPress={() => removeFromCart(id)}>
                  <Text>Remove (${price})</Text>
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
                  <Text>Open</Text>
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
                  <Text>{price ? (isInCart ? 'In cart' : 'Buy') : 'Borrow'}</Text>
               </PopupButton>
            </Styled.ButtonContainer>
         ) : (
            withPopup &&
            price && (
               <Styled.ButtonContainer>
                  <PopupButton>
                     <Text>Price: ${price}</Text>
                  </PopupButton>
               </Styled.ButtonContainer>
            )
         )}
      </BookContainer>
   )
}

type BookContainerProps = Pick<BookProps, 'first'>

const BookContainer = styled.ImageBackground<BookContainerProps>`
   height: ${window.width >= window.height ? window.width / 2.2 : window.height / 2.2}px;
   margin-top: ${({ first }) => (first ? 0 : scale(25))}px;
`
