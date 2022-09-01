import { Sequelize, Model, ENUM, TEXT } from 'sequelize'

import { User } from './User'

class MessageValues extends Model {
    id: number
    type: 'MESSAGE' | 'IMAGE' | 'VIDEO' | 'FILE'
    content: string
    readBy: string
    cloudinaryId: string
}

class MessageAssociations extends MessageValues {
    user: User
}

export class Message extends MessageAssociations {
    dataValues: MessageValues
}

const MessageModel = (sequelize: Sequelize) => {
    Message.init(
        {
            type: {
                type: ENUM('MESSAGE', 'IMAGE', 'VIDEO', 'FILE'),
                allowNull: false
            },
            content: {
                type: TEXT,
                allowNull: false
            },
            filename: {
                type: TEXT,
                defaultValue: ''
            },
            readBy: {
                type: TEXT,
                defaultValue: ''
            },
            cloudinaryId: {
                type: TEXT
            }
        },
        {
            sequelize,
            modelName: 'message'
        }
    )
    return Message
}

export default MessageModel
