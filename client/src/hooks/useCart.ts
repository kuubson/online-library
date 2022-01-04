import { useDispatch, useSelector } from 'react-redux'

import { RootState } from 'redux/reducers'

import actions from 'redux/actions'

export const useCart = () => {
    const dispatch = useDispatch()
    const { cart } = useSelector((state: RootState) => state.cart)
    const resetCart = () =>
        dispatch({
            type: actions.resetCart
        })
    const addToCart = (id: number) =>
        dispatch({
            type: actions.addToCart,
            payload: id
        })
    const removeFromCart = (id: number) =>
        dispatch({
            type: actions.removeFromCart,
            payload: id
        })
    return {
        cart,
        resetCart,
        addToCart,
        removeFromCart
    }
}
