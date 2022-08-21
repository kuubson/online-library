import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

type SliceState = {
   cart: number[]
}

const initialState: SliceState = { cart: [] }

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      _addToCart: (state, { payload }: PayloadAction<number>) => {
         state.cart.push(payload)
      },
      _removeFromCart: (state, { payload }: PayloadAction<number>) => {
         state.cart = state.cart.filter(id => id !== payload)
      },
      _resetCart: () => initialState,
   },
})

export const { _addToCart, _removeFromCart, _resetCart } = cartSlice.actions

export const cart = cartSlice.reducer
