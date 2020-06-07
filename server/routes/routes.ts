import { Express } from 'express'

import user from './user/user'

export default (app: Express) => {
    app.use('/api/user', user)
}
