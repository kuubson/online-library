import { Server } from 'socket.io'

import user from './user'

const socketio = (io: Server) => {
    user(io)
}

export default socketio
