import { useDispatch, useSelector } from 'react-redux'

import { RootState } from 'redux/reducers'

export default () => {
    const dispatch = useDispatch()
    const { cart } = useSelector((state: RootState) => state.cart)
    const resetCart = () =>
        dispatch({
            type: 'resetCart'
        })
    const addToCart = (id: string) =>
        dispatch({
            type: 'addToCart',
            payload: id
        })
    const removeFromCart = (id: string) =>
        dispatch({
            type: 'removeFromCart',
            payload: id
        })
    return {
        cart,
        resetCart,
        addToCart,
        removeFromCart
    }
}
