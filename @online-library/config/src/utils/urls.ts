import { isProd } from 'is'

const LOCALHOST = 'localhost:3001'

export const HOST = 'online-library-application.herokuapp.com'

export const SERVER_URL = isProd ? `https://${HOST}` : `http://${LOCALHOST}`

export const GQL_URL = isProd ? `wss://${HOST}/graphql` : `ws://${LOCALHOST}/graphql`

export const SOCKETIO_URL = isProd ? `https://${HOST}/socket.io` : `http://${LOCALHOST}/socket.io`
