import { useAppDispatch, useAppSelector } from 'redux/hooks'

import {
    resetCart as resetCartAction,
    addToCart as addToCartAction,
    removeFromCart as removeFromCartAction
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
        removeFromCart
    }
}
