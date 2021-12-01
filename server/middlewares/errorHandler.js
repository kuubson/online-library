import utils from '@utils'

const errorHandler = app => app.use((error, _, res, __) => utils.handleError(res, error))

export default errorHandler
