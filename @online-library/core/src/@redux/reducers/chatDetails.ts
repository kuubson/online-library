import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

type SliceState = {
   currentUserId: string | null
   lastUnreadMessageIndex: number | null
   unreadMessagesAmount: number
   canUpdateChatDetails: boolean
}

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
      setLastUnreadMessageIndex: (state, { payload }: PayloadAction<number | null>) => {
         state.lastUnreadMessageIndex = payload
      },
      setUnreadMessagesAmount: (state, { payload }: PayloadAction<number>) => {
         state.unreadMessagesAmount = payload
      },
      setCanUpdateChatDetails: (state, { payload }: PayloadAction<boolean>) => {
         state.canUpdateChatDetails = payload
      },
   },
})

export const { ...chatDetailsActions } = chatDetailsSlice.actions

export const chatDetails = chatDetailsSlice.reducer
