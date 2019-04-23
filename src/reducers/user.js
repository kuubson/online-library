import { SET_EMAIL } from '../actions/actionTypes'

const initialState = {
    email: ""
}

export const user = (state = initialState, action) => {
    if (action.type === SET_EMAIL) {
        return {
            ...state,
            email: action.payload
        }
    }
    return state;
}