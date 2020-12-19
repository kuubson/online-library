import { Model, TEXT, BOOLEAN } from 'sequelize'

export default sequelize => {
    class Authentication extends Model {}
    Authentication.init(
        {
            token: {
                type: TEXT,
                allowNull: false
            },
            isAuthenticated: {
                type: BOOLEAN,
                defaultValue: false
            }
        },
        {
            sequelize,
            modelName: 'authentication'
        }
    )
    return Authentication
}
