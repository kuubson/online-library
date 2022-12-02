import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { Book } from 'gql'

type Data = Book & {
   withProfile: boolean
}

type SliceState = {
   data: Data
}

export const initialState: SliceState = {
   data: {
      id: 0,
      title: '',
      author: '',
      cover: '',
      price: 0,
      withProfile: false,
   },
}

const bookPopupSlice = createSlice({
   name: 'bookPopup',
   initialState,
   reducers: {
      setBookPopupData: (state, { payload }: PayloadAction<SliceState['data']>) => {
         state.data = payload
      },
   },
})

export const { ...bookPopupActions } = bookPopupSlice.actions

export const bookPopup = bookPopupSlice.reducer
