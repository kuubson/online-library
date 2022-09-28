import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { Role } from '@online-library/config'

type RoleState = {
   role: Role
}

const initialState: RoleState = { role: 'guest' }

const roleSlice = createSlice({
   name: 'role',
   initialState,
   reducers: {
      setRole: (state, { payload }: PayloadAction<Role>) => {
         state.role = payload
      },
   },
})

export const roleActions = roleSlice.actions

export const role = roleSlice.reducer
