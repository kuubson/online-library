import { API_URL } from '@env'

import {
   SERVER_URL as _SERVER_URL,
   SOCKETIO_URL as _SOCKETIO_URL,
   isProd,
} from '@online-library/config'

export const SERVER_URL = isProd ? _SERVER_URL : API_URL

export const SOCKETIO_URL = isProd ? _SOCKETIO_URL : `${API_URL}/socket.io`
