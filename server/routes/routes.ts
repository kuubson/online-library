import { Application } from 'express'

import global from './global/global'
import user from './user/user'

const routes = (app: Application) => {
    app.use('/api/global', global)
    app.use('/api/user', user)
}

export default routes
