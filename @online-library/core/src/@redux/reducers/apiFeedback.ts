/* eslint-disable @typescript-eslint/no-empty-function */
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

type SliceState = {
   header: string
   message: string
   buttonText: string
   callback: () => void
}

const initialState: SliceState = {
   header: '',
   message: '',
   buttonText: '',
   callback: () => {},
}

const apiFeedbackSlice = createSlice({
   name: 'apiFeedback',
   initialState,
   reducers: {
      setApiFeedback: (
         state,
         { payload: { header, message, buttonText, callback } }: PayloadAction<SliceState>
      ) => {
         state.header = header
         state.message = message
         state.buttonText = buttonText
         state.callback = callback
      },
   },
})

export const { ...apiFeedbackActions } = apiFeedbackSlice.actions

export const apiFeedback = apiFeedbackSlice.reducer
