import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const loaderSlice = createSlice({
   name: 'loader',
   initialState: { loading: false },
   reducers: {
      _setLoading: (state, { payload }: PayloadAction<boolean>) => {
         state.loading = payload
      },
   },
})

export const { _setLoading } = loaderSlice.actions

export const loader = loaderSlice.reducer
