import React, { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import getCookie from '../../resources/helpers/getCookie'

import MainBackground from "../../assets/img/MainBackground.jpg";
import Navbar from '../../sharedComponents/Navbar/Navbar'
import BookUploader from '../../sharedComponents/BookUploader/BookUploader'
import Loader from '../../sharedComponents/Loader/Loader'
import CartBooks from './CartBooks'

const CartWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${MainBackground}) center center no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Cart = props => {
  const shouldBookUploaderAppear = useSelector(state => state.global.shouldBookUploaderAppear)
  const isLoading = useSelector(state => state.global.isLoading)
  useLayoutEffect(() => {
    if (!getCookie('token')) props.history.push('/login')
  }, [])
  return (
    <CartWrapper>
      <Navbar cart />
      <CartBooks />
      {shouldBookUploaderAppear && <BookUploader />}
      {isLoading && <Loader />}
    </CartWrapper>
  );
};

export default Cart;
