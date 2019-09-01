import React, { useLayoutEffect } from 'react'
import styled from 'styled-components'
import getCookie from '../../resources/helpers/getCookie'

import MainBackground from "../../assets/img/MainBackground.jpg";
import Navbar from '../../sharedComponents/Navbar/Navbar'
import CartBooks from './CartBooks'

const CartWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${MainBackground}) center center no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Cart = props => {
  useLayoutEffect(() => {
    if (!getCookie('token')) props.history.push('/login')
  }, [])
  return (
    <CartWrapper>
      <Navbar cart />
      <CartBooks />
    </CartWrapper>
  );
};

export default Cart;
