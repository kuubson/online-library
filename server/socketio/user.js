import jwt from 'jsonwebtoken'

import { User, Message } from '@database'

import utils from '@utils'

export default io => {
    const userIo = io.of('/user')
    userIo.use((socket, next) => {
        const token = utils.getCookie(socket.request.headers.cookie, 'token')
        if (!token) {
            next(new Error())
        } else {
            jwt.verify(token, process.env.JWT_KEY, async (error, data) => {
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
    userIo.on('connection', socket => {
        const id = socket.user.id
        socket.on('sendMessage', data => socket.broadcast.emit('sendMessage', data))
        socket.on('readMessages', async () => {
            await Message.findAll().then(
                async messages =>
                    await Promise.all(
                        messages.map(async message => {
                            const readByIds = message.readBy.split(',').filter(v => v)
                            if (!readByIds.includes(id.toString())) {
                                readByIds.push(id)
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
