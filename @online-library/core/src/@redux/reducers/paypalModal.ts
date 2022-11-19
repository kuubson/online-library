import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const paypalModalSlice = createSlice({
   name: 'paypalModal',
   initialState: { showPayPalModal: false },
   reducers: {
      setShowPayPalModal: (state, { payload }: PayloadAction<boolean>) => {
         state.showPayPalModal = payload
      },
   },
})

export const { ...paypalModalActions } = paypalModalSlice.actions

export const paypalModal = paypalModalSlice.reducer
