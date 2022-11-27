import { useState } from 'react'
import styled, { css } from 'styled-components'

import { FALLBACK_IMAGE } from '@online-library/config'

import type { Book as BookType } from '@online-library/core'
import { bookPopupButtonText, t, useBookPopup, useCart } from '@online-library/core'

import { Button } from 'styles/styled'

import * as Styled from './styled'

type BookProps = BookType & {
   withCart?: boolean
   withProfile?: boolean
   withPopup?: boolean
   withFlips?: boolean
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
   withFlips,
}: BookProps) => {
   const { cart, removeFromCart } = useCart()

   const { setBookPopupData } = useBookPopup()

   const [loading, setLoading] = useState(true)

   const handleBookPopup = () =>
      setBookPopupData({
         id,
         title,
         author,
         cover,
         price,
         withProfile: false,
      })

   const isInCart = cart.includes(id)

   return (
      <BookContainer withPopup={withPopup} withFlips={withFlips}>
         <Styled.Loader
            onAnimationEnd={event => (event.currentTarget.style.display = 'none')}
            $loading={loading}
         />
         <Styled.Cover
            src={cover}
            onLoad={() => setLoading(false)}
            onError={event => {
               setLoading(true)
               event.currentTarget.src = FALLBACK_IMAGE
            }}
         />
         <Styled.Annotations>
            <Styled.Annotation>{author}</Styled.Annotation>
            <Styled.Annotation withTitle>{title}</Styled.Annotation>
         </Styled.Annotations>
         {withCart ? (
            <Button onClick={() => removeFromCart(id)} price={price}>
               {t('buttons.remove')}
            </Button>
         ) : withProfile ? (
            <Button onClick={handleBookPopup}>{t('buttons.open')}</Button>
         ) : !withPopup ? (
            <Button
               onClick={() => !isInCart && handleBookPopup()}
               price={price}
               withoutHover={isInCart}
            >
               <>
                  {bookPopupButtonText({
                     price,
                     isInCart,
                  })}
               </>
            </Button>
         ) : (
            withPopup &&
            price && (
               <Button price={price} withoutHover>
                  {t('buttons.price')}
               </Button>
            )
         )}
      </BookContainer>
   )
}

type BookContainerProps = {
   withPopup?: boolean
   withFlips?: boolean
}

const BookContainer = styled.div<BookContainerProps>`
   width: 100%;
   height: 100%;
   position: relative;
   ${({ withPopup }) =>
      withPopup
         ? css`
              width: 100%;
              @media (max-width: 1150px) {
                 max-height: 50%;
              }
           `
         : null}
   ${({ withFlips }) =>
      withFlips
         ? css`
              @media (max-width: 1150px) {
                 max-height: 100%;
              }
           `
         : null}
`
