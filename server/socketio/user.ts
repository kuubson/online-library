import jwt from 'jsonwebtoken'
import { Server, Socket } from 'socket.io'

import { User, Message } from 'database/database'
import { User as UserClass } from 'database/models/User'

import utils from 'utils'

interface ISocket extends Socket {
    user?: UserClass
}

const user = (io: Server) => {
    const userIo = io.of('/user')
    userIo.use((socket: ISocket, next) => {
        const token = utils.cookie.getCookie(socket.request.headers.cookie, 'token')
        if (!token) {
            next(new Error())
        } else {
            jwt.verify(token, process.env.JWT_KEY!, async (error: any, data: any) => {
                if (error) {
                    next(new Error())
                } else {
                    const { email } = data
                    try {
                        const user = await User.findOne({
                            where: {
                                email
                            }
                        })
                        if (!user) {
                            next(new Error())
                        } else {
                            socket.user = user
                            next()
                        }
                    } catch (error) {
                        next(new Error())
                    }
                }
            })
        }
    })
    userIo.on('connection', (socket: ISocket) => {
        const id = socket.user!.id
        socket.on('sendMessage', data => socket.broadcast.emit('sendMessage', data))
        socket.on('readMessages', async () => {
            await Message.findAll().then(
                async messages =>
                    await Promise.all(
                        messages.map(async message => {
                            const readByIds = message.readBy.split(',').filter(v => v)
                            const ID = id.toString()
                            if (!readByIds.includes(ID)) {
                                readByIds.push(ID)
                            }
                            await message.update({
                                readBy: readByIds.join(',')
                            })
                        })
                    )
            )
        })
    })
}

export default user
