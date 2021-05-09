import { Connection, Message } from '@database'

export default async (req, res, next) => {
    try {
        await Connection.transaction(async transaction => {
            const { id } = req.user
            const unreadMessagesAmount = await Message.findAll({
                transaction
            }).then(messages => {
                let unreadMessagesAmount = 0
                messages.map(({ readBy }) => {
                    const readByIds = readBy.split(',').filter(v => v)
                    if (!readByIds.includes(id.toString())) {
                        unreadMessagesAmount++
                    }
                })
                return unreadMessagesAmount
            })
            res.send({
                unreadMessagesAmount,
                userId: id
            })
        })
    } catch (error) {
        next(error)
    }
}
