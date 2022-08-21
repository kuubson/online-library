import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Socket } from 'socket.io-client'

type SocketType = Socket | null

type SliceState = {
   socket: SocketType
}

const initialState: SliceState = { socket: null }

const socketSlice = createSlice({
   name: 'socket',
   initialState,
   reducers: {
      _setSocket: (state, { payload }: PayloadAction<SocketType>) => {
         state.socket = payload as any
      },
   },
})

export const { _setSocket } = socketSlice.actions

export const socket = socketSlice.reducer
