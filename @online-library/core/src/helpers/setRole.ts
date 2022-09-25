import { Role } from '@online-library/config'

import { store } from '@redux'

import { roleActions } from '@redux/reducers/role'

export const setRole = (role: Role) => store.dispatch(roleActions.setRole(role))
