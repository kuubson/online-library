import utils from '@utils'

export default app => app.use((error, _, res, __) => utils.handleError(res, error))
