import { User, Message } from 'database'

import { validator } from 'helpers'
import { updateReadByProperty } from './helpers'

import { ProtectedRoute } from 'types/express'

export const getMessages: ProtectedRoute = async (req, res, next) => {
    try {
        const { id, name } = req.user
        const { limit, offset } = req.body
        const messages = await Message.findAll({
            limit,
            offset,
            order: [['id', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        }).then(messages => messages.sort((a, b) => a.id - b.id))
        const updatedMessage = await updateReadByProperty(id, messages)
        const messagesWithUserName = updatedMessage.map(message => ({
            ...message.dataValues,
            userName: message.user.name
        }))
        res.send({
            messages: messagesWithUserName,
            userId: id,
            userName: name
        })
    } catch (error) {
        next(error)
    }
}

export const validation = () => [
    validator.validateInteger('limit'),
    validator.validateInteger('offset')
]
