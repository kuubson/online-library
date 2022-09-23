import { isProd, isWeb } from 'is'

const protocol = !isProd ? 'http://' : 'https://'

const port = !isProd ? ':3001' : ''

const wsPrefix = !isProd ? 'ws' : 'wss'

export const serverUrl = isWeb ? `${protocol}${window.location.hostname}${port}` : ''

export const websocketUrl = isWeb ? `${wsPrefix}://${window.location.hostname}${port}/graphql` : ''
