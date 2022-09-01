import { Sequelize, Model, TEXT, BOOLEAN } from 'sequelize'

class AuthenticationValues extends Model {
    id: number
    token: string
    authenticated: boolean
}

export class Authentication extends AuthenticationValues {
    dataValues: AuthenticationValues
}

const AuthenticationModel = (sequelize: Sequelize) => {
    Authentication.init(
        {
            token: {
                type: TEXT,
                allowNull: false
            },
            authenticated: {
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

export default AuthenticationModel
