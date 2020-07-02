import { Express } from 'express'

import global from './global/global'

import user from './user/user'

export default (app: Express) => {
    app.use('/api/global', global)

    app.use('/api/user', user)
}
