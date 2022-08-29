const initialState = {
    cart: []
}

export default (state = initialState, { payload, type }) => {
    switch (type) {
        case 'resetCart':
            return {
                ...state,
                cart: []
            }
        case 'addToCart':
            return {
                ...state,
                cart: [payload, ...state.cart]
            }
        case 'removeFromCart':
            return {
                ...state,
                cart: [...state.cart.filter(bookId => bookId !== payload)]
            }
        default:
            return state
    }
}
