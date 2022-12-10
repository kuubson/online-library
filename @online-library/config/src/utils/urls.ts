import { isProd } from 'is'

const LOCALHOST = 'localhost'

export const HOST = 'online-library.up.railway.app'

export const CLIENT_URL = isProd ? `https://${HOST}` : `http://${LOCALHOST}:3000`

export const SERVER_URL = isProd ? `https://${HOST}` : `http://${LOCALHOST}:3001`

export const GQL_URL = isProd ? `wss://${HOST}/graphql` : `ws://${LOCALHOST}/graphql`
