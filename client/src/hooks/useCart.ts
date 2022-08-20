import { useAppDispatch, useAppSelector } from 'redux/hooks'

import {
   addToCart as addToCartAction,
   removeFromCart as removeFromCartAction,
   resetCart as resetCartAction,
} from 'redux/reducers/cart'

export const useCart = () => {
   const dispatch = useAppDispatch()
   const { cart } = useAppSelector(state => state.cart)
   const resetCart = () => dispatch(resetCartAction())
   const addToCart = (id: number) => dispatch(addToCartAction(id))
   const removeFromCart = (id: number) => dispatch(removeFromCartAction(id))
   return {
      cart,
      resetCart,
      addToCart,
      removeFromCart,
   }
}
