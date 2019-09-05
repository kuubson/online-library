import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

import CartBookTitle from './CartBookTitle'
import CartBookAuthor from './CartBookAuthor'
import CartBookPrice from './CartBookPrice'
import CartBookButton from './CartBookButton'

const CartBookWrapper = styled.div`
    position: relative;
    cursor: pointer;
    transition: 0.5s;
    :hover{
        transform: scale(1.02)
    }
    @media (max-width: 1000px) {
        font-size: 0.8rem;
    }
    @media (max-width: 800px) {
        font-size: 0.75rem;
    }
`;
const CartBookContent = styled.img`
    width: 100%;
    height: 100%;
`;
const CartBookAuthorAndTitleWrapper = styled.div`
    position: absolute;
    top: 25px;
    left: 50%;
    transform: translate(-50%, 0px);
`;

const CartBook = ({ id, author, title, price, cover }) => {
    const dispatch = useDispatch()
    const setCart = payload => dispatch({ type: 'setCart', payload })
    const cartBooks = useSelector(state => state.global.cart)
    const removeBook = id => {
        let currentCart = [...cartBooks]
        let updatedCart = currentCart.filter(book => {
            return book.id !== id
        })
        setCart(updatedCart)
    }
    return (
        <CartBookWrapper>
            <CartBookContent src={cover} />
            <CartBookAuthorAndTitleWrapper>
                {author && <CartBookAuthor author={author} />}
                {title && <CartBookTitle title={title} />}
            </CartBookAuthorAndTitleWrapper>
            {price && <CartBookPrice price={price} />}
            <CartBookButton text="Cancel" onClick={() => removeBook(id)} />
        </CartBookWrapper>
    )
}

export default CartBook