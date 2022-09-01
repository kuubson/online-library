import { Socket } from 'socket.io-client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SocketType = Socket | null

type SliceState = {
    socket: SocketType
}

const initialState: SliceState = {
    socket: null
}

const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setSocket: (state, { payload }: PayloadAction<SocketType>) => {
            state.socket = payload as any
        }
    }
})

export const { setSocket } = socketSlice.actions

export default socketSlice.reducer
