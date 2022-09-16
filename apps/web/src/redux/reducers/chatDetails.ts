import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

type SliceState = {
   lastUnreadMessageIndex: number | null
   unreadMessagesAmount: number
}

type Payload = PayloadAction<number>

const initialState: SliceState = {
   lastUnreadMessageIndex: null,
   unreadMessagesAmount: 0,
}

const chatDetailsSlice = createSlice({
   name: 'chatDetails',
   initialState,
   reducers: {
      setLastUnreadMessageIndex: (state, { payload }: Payload) => {
         state.lastUnreadMessageIndex = payload
      },
      setUnreadMessagesAmount: (state, { payload }: Payload) => {
         state.unreadMessagesAmount = payload
      },
   },
})

export const chatDetailsActions = chatDetailsSlice.actions

export const chatDetails = chatDetailsSlice.reducer
