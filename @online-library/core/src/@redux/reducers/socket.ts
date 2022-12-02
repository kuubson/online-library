import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

type SliceState = {
   socket: any | null
}

const initialState: SliceState = { socket: null }

const socketSlice = createSlice({
   name: 'socket',
   initialState,
   reducers: {
      setSocket: (state, { payload }: PayloadAction<any>) => {
         state.socket = payload
      },
   },
})

export const { ...socketActions } = socketSlice.actions

export const socket = socketSlice.reducer
