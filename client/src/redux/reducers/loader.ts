import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const loaderSlice = createSlice({
   name: 'loader',
   initialState: {
      loading: false,
   },
   reducers: {
      setLoading: (state, { payload }: PayloadAction<boolean>) => {
         state.loading = payload
      },
   },
})

export const { setLoading } = loaderSlice.actions

export default loaderSlice.reducer
