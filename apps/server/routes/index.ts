import { Application } from 'express'

import { Global } from './global/global'
import { User } from './user/user'

export const routes = (app: Application) => {
    app.use('/api/global', Global)
    app.use('/api/user', User)
}
