import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type SliceState = {
   lastUnreadMessageIndex: number | null
   unreadMessagesAmount: number
}

type Payload = PayloadAction<number>

const initialState: SliceState = {
   lastUnreadMessageIndex: null,
   unreadMessagesAmount: 0,
}

const messagesInfoSlice = createSlice({
   name: 'messagesInfo',
   initialState,
   reducers: {
      _setLastUnreadMessageIndex: (state, { payload }: Payload) => {
         state.lastUnreadMessageIndex = payload
      },
      _setUnreadMessagesAmount: (state, { payload }: Payload) => {
         state.unreadMessagesAmount = payload
      },
   },
})

export const { _setLastUnreadMessageIndex, _setUnreadMessagesAmount } = messagesInfoSlice.actions

export const messagesInfo = messagesInfoSlice.reducer
