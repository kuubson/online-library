import { _addToCart, _removeFromCart, _resetCart } from 'redux/reducers/cart'

import { useSelector } from 'hooks'

import { useAction } from './useAction'

export const useCart = () => {
   const { cart } = useSelector(state => state.cart)

   const resetCart = useAction(_resetCart)

   const addToCart = useAction(_addToCart)

   const removeFromCart = useAction(_removeFromCart)

   return {
      cart,
      resetCart,
      addToCart,
      removeFromCart,
   }
}
