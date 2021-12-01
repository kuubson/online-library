import global from './global/global'

import user from './user/user'

const routes = app => {
    app.use('/api/global', global)
    app.use('/api/user', user)
}

export default routes
