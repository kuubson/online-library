import { Model, STRING, TEXT } from 'sequelize'
import bcrypt from 'bcrypt'

export default sequelize => {
    class User extends Model {}
    User.init(
        {
            email: {
                type: STRING,
                allowNull: false
            },
            password: {
                type: TEXT,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'user',
            hooks: {
                beforeCreate: user => (user.password = bcrypt.hashSync(user.password, 11))
            }
        }
    )
    return User
}
