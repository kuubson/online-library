import { NODE_ENV } from 'config'

const protocol = NODE_ENV !== 'production' ? 'http://' : 'https://'

const port = NODE_ENV !== 'production' ? ':3001' : ''

const wsPrefix = NODE_ENV !== 'production' ? 'ws' : 'wss'

export const baseUrl = `${protocol}${window.location.hostname}${port}`

export const websocketUrl = `${wsPrefix}://${window.location.hostname}${port}/graphql`
