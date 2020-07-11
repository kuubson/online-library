import { useDispatch, useSelector } from 'react-redux'

import { RootState } from 'redux/reducers'

export default () => {
    const dispatch = useDispatch()
    const { cart } = useSelector((state: RootState) => state.cart)
    const addToCart = (id: number) =>
        dispatch({
            type: 'addToCart',
            payload: id
        })
    const removeFromCart = (id: number) =>
        dispatch({
            type: 'removeFromCart',
            payload: id
        })
    return {
        cart,
        addToCart,
        removeFromCart
    }
}
