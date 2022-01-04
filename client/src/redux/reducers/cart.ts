import actions from 'redux/actions'

type State = {
    cart: number[]
}

const initialState: State = {
    cart: []
}

type Action = {
    payload: number
    type: 'resetCart' | 'addToCart' | 'removeFromCart'
}

const cart = (state = initialState, { payload, type }: Action) => {
    switch (type) {
        case actions.resetCart:
            return {
                ...state,
                cart: []
            }
        case actions.addToCart:
            return {
                ...state,
                cart: [payload, ...state.cart]
            }
        case actions.removeFromCart:
            return {
                ...state,
                cart: [...state.cart.filter(bookId => bookId !== payload)]
            }
        default:
            return state
    }
}

export default cart
