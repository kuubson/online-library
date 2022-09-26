import axios from 'axios'
import { AppRegistry } from 'react-native'

import { customAxios } from '@online-library/core'

import { SERVER_URL } from 'config'

import { Providers } from 'components/shared'

import { name as appName } from './app.json'
import { App } from './src/components/App'

axios.defaults.baseURL = SERVER_URL

customAxios.defaults.baseURL = SERVER_URL

AppRegistry.registerComponent(appName, () => () => (
   <Providers>
      <App />
   </Providers>
))
