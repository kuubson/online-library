import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SliceState = {
    cart: number[]
}

const initialState: SliceState = {
    cart: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, { payload }: PayloadAction<number>) => {
            state.cart.push(payload)
        },
        removeFromCart: (state, { payload }: PayloadAction<number>) => {
            state.cart = state.cart.filter(id => id !== payload)
        },
        resetCart: () => initialState
    }
})

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions

export default cartSlice.reducer
