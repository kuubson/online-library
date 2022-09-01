import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SliceState = {
    lastUnreadMessageIndex: number | null
    unreadMessagesAmount: number
}

type Payload = PayloadAction<number>

const initialState: SliceState = {
    lastUnreadMessageIndex: null,
    unreadMessagesAmount: 0
}

const messagesInfoSlice = createSlice({
    name: 'messagesInfo',
    initialState,
    reducers: {
        setLastUnreadMessageIndex: (state, { payload }: Payload) => {
            state.lastUnreadMessageIndex = payload
        },
        setUnreadMessagesAmount: (state, { payload }: Payload) => {
            state.unreadMessagesAmount = payload
        }
    }
})

export const { setLastUnreadMessageIndex, setUnreadMessagesAmount } = messagesInfoSlice.actions

export default messagesInfoSlice.reducer
