import { Connection, User, Message } from '@database'

export default async (req, res, next) => {
    try {
        await Connection.transaction(async transaction => {
            const { id } = req.user
            const messages = await Message.findAll({
                order: [['id', 'ASC']],
                include: [
                    {
                        model: User,
                        attributes: ['name']
                    }
                ],
                transaction
            }).then(
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
                            return {
                                ...message.dataValues,
                                nameInitial: message.user.name.charAt(0)
                            }
                        })
                    )
            )
            res.send({
                messages,
                userId: req.user.id,
                nameInitial: req.user.name.charAt(0)
            })
        })
    } catch (error) {
        next(error)
    }
}
