import React from 'react'
import styled from 'styled-components'

const CartBookAuthorWrapper = styled.div`
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
`;

const CartBookAuthor = ({ author }) => {
    return (
        <CartBookAuthorWrapper>{author}</CartBookAuthorWrapper>
    )
}

export default CartBookAuthor