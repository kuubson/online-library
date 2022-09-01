import { NODE_ENV } from 'config'

const protocol = NODE_ENV !== 'production' ? 'http://' : 'https://'

export const baseUrl = `${protocol}${location.host}${NODE_ENV !== 'production' ? ':3001' : ''}`

export const websocketUrl =
   NODE_ENV === 'production' ? `wss://${location.host}/graphql` : 'ws://localhost:3001/graphql'
