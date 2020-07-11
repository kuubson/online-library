interface IAction {
    payload: number
    type: 'addToCart' | 'removeFromCart'
}

interface IState {
    cart: number[]
}

const initialState: IState = {
    cart: []
}

export default (state = initialState, { payload, type }: IAction) => {
    switch (type) {
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
