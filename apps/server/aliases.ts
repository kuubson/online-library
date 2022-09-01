import path from 'path'
import moduleAlias from 'module-alias'

moduleAlias.addAlias('database', path.resolve(__dirname, './database'))
moduleAlias.addAlias('middlewares', path.resolve(__dirname, './middlewares'))
moduleAlias.addAlias('gql', path.resolve(__dirname, './gql'))
moduleAlias.addAlias('socketio', path.resolve(__dirname, './socketio'))
moduleAlias.addAlias('routes', path.resolve(__dirname, './routes'))
moduleAlias.addAlias('helpers', path.resolve(__dirname, './helpers'))
moduleAlias.addAlias('utils', path.resolve(__dirname, './utils'))
