import { Model, TEXT, INTEGER } from 'sequelize'

export default sequelize => {
    class Message extends Model {}
    Message.init(
        {
            sender: {
                type: INTEGER,
                allowNull: false
            },
            content: {
                type: TEXT,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'message'
        }
    )
    return Message
}
