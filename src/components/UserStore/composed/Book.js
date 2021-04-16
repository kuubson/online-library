import React, { useState } from 'react'
import styled, { css } from 'styled-components/macro'
import Loader from 'react-spinkit'

import hooks from 'hooks'

import Dashboard from '../styled/Dashboard'

const BookContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    ${({ withPopup }) =>
        withPopup &&
        css`
            width: 100%;
            @media (max-width: 1150px) {
                max-height: 50%;
            }
        `}
    ${({ withFlips }) =>
        withFlips &&
        css`
            @media (max-width: 1150px) {
                max-height: 100%;
            }
        `}
`

const Book = ({
    id,
    title,
    author,
    cover,
    price,
    setBookPopupData,
    withCart,
    withProfile,
    withPopup,
    withFlips
}) => {
    const [isLoading, setIsLoading] = useState(true)
    const { cart, removeFromCart } = hooks.useCart()
    const isInCart = cart.includes(id)
    return (
        <BookContainer withPopup={withPopup} withFlips={withFlips}>
            <Dashboard.Loader
                onAnimationEnd={e => (e.currentTarget.style.display = 'none')}
                isLoading={isLoading}
            >
                {isLoading && <Loader name="circle" fadeIn="none" />}
            </Dashboard.Loader>
            <Dashboard.Cover
                src={cover}
                onLoad={() => setIsLoading(false)}
                onError={e => {
                    setIsLoading(true)
                    e.currentTarget.src = `https://picsum.photos/1920/108${Math.floor(
                        Math.random() * 10
                    )}`
                }}
            />
            <Dashboard.AnnotationsContainer>
                <Dashboard.Annotation>{author}</Dashboard.Annotation>
                <Dashboard.Annotation withTitle>{title}</Dashboard.Annotation>
            </Dashboard.AnnotationsContainer>
            {withCart ? (
                <Dashboard.Button onClick={() => removeFromCart(id)} price={price}>
                    Remove
                </Dashboard.Button>
            ) : withProfile ? (
                <Dashboard.Button
                    onClick={() =>
                        setBookPopupData &&
                        setBookPopupData({
                            id,
                            title,
                            author,
                            cover,
                            price
                        })
                    }
                >
                    Open
                </Dashboard.Button>
            ) : !withPopup ? (
                <Dashboard.Button
                    onClick={() =>
                        setBookPopupData &&
                        !isInCart &&
                        setBookPopupData({
                            id,
                            title,
                            author,
                            cover,
                            price
                        })
                    }
                    price={price}
                    withoutHover={isInCart}
                >
                    {price ? (isInCart ? 'In cart' : 'Buy') : 'Borrow'}
                </Dashboard.Button>
            ) : (
                withPopup &&
                price && (
                    <Dashboard.Button price={price} withoutHover>
                        Price
                    </Dashboard.Button>
                )
            )}
        </BookContainer>
    )
}

export default Book
