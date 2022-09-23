import { cartActions } from '@redux/reducers/cart'

import { useSelector } from 'hooks'

import { useAction } from './common/useAction'

export const useCart = () => {
   const { cart } = useSelector(state => state.cart)

   const resetCart = useAction(cartActions.resetCart)

   const addToCart = useAction(cartActions.addToCart)

   const removeFromCart = useAction(cartActions.removeFromCart)

   return {
      cart,
      resetCart,
      addToCart,
      removeFromCart,
   }
}
