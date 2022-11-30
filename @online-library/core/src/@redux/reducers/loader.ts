import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const loaderSlice = createSlice({
   name: 'loader',
   initialState: { loading: false },
   reducers: {
      setLoading: (state, { payload }: PayloadAction<boolean>) => {
         state.loading = payload
      },
   },
})

export const { ...loaderActions } = loaderSlice.actions

export const loader = loaderSlice.reducer
