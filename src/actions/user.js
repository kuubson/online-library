import { SET_EMAIL } from '../actions/actionTypes'

export const setEmail = (payload) => {
    return {
        type: SET_EMAIL,
        payload
    }
}