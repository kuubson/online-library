import { SET_EMAIL } from './actionTypes'

export const setEmail = (payload) => {
    return {
        type: SET_EMAIL,
        payload
    }
}