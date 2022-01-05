import { Connection, Message } from 'database'

import { ProtectedRoute } from 'types/global'

const getMessagesInfo: ProtectedRoute = async (req, res, next) => {
    try {
        await Connection.transaction(async transaction => {
            const { id } = req.user
            const { lastUnreadMessageIndex, unreadMessagesAmount } = await Message.findAll({
                transaction
            }).then(messages => {
                let lastUnreadMessageIndex: number | undefined
                let unreadMessagesAmount = 0
                messages.map(({ readBy }, index) => {
                    const readByIds = readBy.split(',').filter(v => v)
                    if (!readByIds.includes(id.toString())) {
                        unreadMessagesAmount++
                        if (!lastUnreadMessageIndex) {
                            lastUnreadMessageIndex = messages.length - index
                        }
                    }
                })
                return {
                    lastUnreadMessageIndex,
                    unreadMessagesAmount
                }
            })
            res.send({
                lastUnreadMessageIndex,
                unreadMessagesAmount,
                userId: id
            })
        })
    } catch (error) {
        next(error)
    }
}

export default getMessagesInfo
