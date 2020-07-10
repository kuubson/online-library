import { Response } from 'express'

import { User } from '../../../database/database'

export default interface IContext {
    res: Response
    user: User
}
