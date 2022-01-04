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
        resetCart: () => initialState,
        addToCart: (state, { payload }: PayloadAction<number>) => {
            state.cart.push(payload)
        },
        removeFromCart: (state, { payload }: PayloadAction<number>) => {
            state.cart.filter(id => id !== payload)
        }
    }
})

export const { resetCart, addToCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer
