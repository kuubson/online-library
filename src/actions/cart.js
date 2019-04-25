import { SET_CART } from './actionTypes'

export const setCart = (payload) => {
    return {
        type: SET_CART,
        payload
    }
}