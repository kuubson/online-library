const rewireHotLoader = require('react-app-rewire-hot-loader')

module.exports = (config, env) => {
    config = rewireHotLoader(config, env)
    return config
}
