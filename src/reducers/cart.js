import { SET_CART } from '../actions/actionTypes'

const initialState = {
    cart: []
}

export const cart = (state = initialState, action) => {
    if (action.type === SET_CART) {
        return {
            ...state,
            cart: action.payload
        }
    }
    return state;
}