import { useDispatch, useSelector } from 'react-redux'

export default () => {
    const dispatch = useDispatch()
    const { cart } = useSelector(state => state.cart)
    const resetCart = () =>
        dispatch({
            type: 'resetCart'
        })
    const addToCart = id =>
        dispatch({
            type: 'addToCart',
            payload: id
        })
    const removeFromCart = id =>
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
