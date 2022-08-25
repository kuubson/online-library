import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { Socket } from 'socket.io-client'

type SliceState = {
   socket: Socket | null
}

const initialState: SliceState = { socket: null }

const socketSlice = createSlice({
   name: 'socket',
   initialState,
   reducers: {
      _setSocket: (state, { payload }: PayloadAction<SocketType>) => {
         state.socket = payload
      },
   },
})

export const { _setSocket } = socketSlice.actions

export const socket = socketSlice.reducer
