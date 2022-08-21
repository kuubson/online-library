import { useSelector } from 'react-redux'

import { _addToCart, _removeFromCart, _resetCart } from 'redux/reducers/cart'

import { useDispatch } from 'hooks'

export const useCart = () => {
   const dispatch = useDispatch()

   const { cart } = useSelector(state => state.cart)

   const resetCart = () => dispatch(_resetCart())

   const addToCart = (id: number) => dispatch(_addToCart(id))

   const removeFromCart = (id: number) => dispatch(_removeFromCart(id))

   return {
      cart,
      resetCart,
      addToCart,
      removeFromCart,
   }
}
