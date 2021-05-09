import { Model, ENUM, TEXT } from 'sequelize'

export default sequelize => {
    class Message extends Model {}
    Message.init(
        {
            type: {
                type: ENUM(['MESSAGE', 'IMAGE', 'VIDEO', 'FILE']),
                allowNull: false
            },
            content: {
                type: TEXT,
                allowNull: false
            },
            readBy: {
                type: TEXT,
                defaultValue: ''
            }
        },
        {
            sequelize,
            modelName: 'message'
        }
    )
    return Message
}
