import { Server } from 'socket.io'

import { user } from './user'

export const initializeSocketIO = (io: Server) => {
    user(io)
}
