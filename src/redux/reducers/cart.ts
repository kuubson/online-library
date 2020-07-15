interface IAction {
    payload: string
    type: 'resetCart' | 'addToCart' | 'removeFromCart'
}

interface IState {
    cart: string[]
}

const initialState: IState = {
    cart: []
}

export default (state = initialState, { payload, type }: IAction) => {
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
