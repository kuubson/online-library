import { Model, STRING, TEXT } from 'sequelize'
import bcrypt from 'bcrypt'

export default sequelize => {
    class User extends Model {}
    User.init(
        {
            name: {
                type: STRING,
                allowNull: false
            },
            email: {
                type: STRING,
                allowNull: false
            },
            password: {
                type: TEXT,
                allowNull: false
            },
            passwordToken: {
                type: TEXT
            }
        },
        {
            sequelize,
            modelName: 'user',
            hooks: {
                beforeCreate: user => {
                    user.password = bcrypt.hashSync(user.password, 11)
                }
            }
        }
    )
    return User
}
