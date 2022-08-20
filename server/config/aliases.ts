import moduleAlias from 'module-alias'
import path from 'path'

moduleAlias.addAlias('shared', path.resolve(__dirname, '../../client/src/shared'))

moduleAlias.addAlias('config', path.resolve(__dirname, '../config'))
moduleAlias.addAlias('database', path.resolve(__dirname, '../database'))
moduleAlias.addAlias('middlewares', path.resolve(__dirname, '../middlewares'))
moduleAlias.addAlias('gql', path.resolve(__dirname, '../gql'))
moduleAlias.addAlias('socketio', path.resolve(__dirname, '../socketio'))
moduleAlias.addAlias('routes', path.resolve(__dirname, '../routes'))
moduleAlias.addAlias('helpers', path.resolve(__dirname, '../helpers'))
moduleAlias.addAlias('utils', path.resolve(__dirname, '../utils'))
