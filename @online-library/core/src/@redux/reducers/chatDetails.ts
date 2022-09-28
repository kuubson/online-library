import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

type SliceState = {
   currentUserId: string | null
   lastUnreadMessageIndex: number | null
   unreadMessagesAmount: number
   canUpdateChatDetails: boolean
}

type Payload = PayloadAction<number>

const initialState: SliceState = {
   currentUserId: null,
   lastUnreadMessageIndex: null,
   unreadMessagesAmount: 0,
   canUpdateChatDetails: false,
}

const chatDetailsSlice = createSlice({
   name: 'chatDetails',
   initialState,
   reducers: {
      setCurrentUserId: (state, { payload }: PayloadAction<string>) => {
         state.currentUserId = payload
      },
      setLastUnreadMessageIndex: (state, { payload }: Payload) => {
         state.lastUnreadMessageIndex = payload
      },
      setUnreadMessagesAmount: (state, { payload }: Payload) => {
         state.unreadMessagesAmount = payload
      },
      setCanUpdateChatDetails: (state, { payload }: PayloadAction<boolean>) => {
         state.canUpdateChatDetails = payload
      },
   },
})

export const chatDetailsActions = chatDetailsSlice.actions

export const chatDetails = chatDetailsSlice.reducer
