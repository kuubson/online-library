import global from './global/global'

import user from './user/user'

export default app => {
    app.use('/api/global', global)

    app.use('/api/user', user)
}
