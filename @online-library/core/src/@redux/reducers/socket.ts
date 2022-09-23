import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { Socket } from 'socket.io-client'

import type { AnySocket } from '../../types'

type SliceState = {
   socket: Socket | null
}

const initialState: SliceState = { socket: null }

const socketSlice = createSlice({
   name: 'socket',
   initialState,
   reducers: {
      setSocket: (state, { payload }: PayloadAction<AnySocket>) => {
         state.socket = payload
      },
   },
})

export const socketActions = socketSlice.actions

export const socket = socketSlice.reducer
