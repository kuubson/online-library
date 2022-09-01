import { NODE_ENV } from 'config'

const protocol = NODE_ENV !== 'production' ? 'http://' : 'https://'

export const baseUrl = `${protocol}${window.location.host}${
   NODE_ENV !== 'production' ? ':3001' : ''
}`
