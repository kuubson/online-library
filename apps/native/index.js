import { API_BASEURL } from '@env'
import axios from 'axios'
import { AppRegistry } from 'react-native'

import { HOST_URL, isProd } from '@online-library/config'

import { customAxios } from '@online-library/core'

import { Providers } from 'components/shared'

import { name as appName } from './app.json'
import { App } from './src/components/App'

axios.defaults.baseURL = isProd ? HOST_URL : API_BASEURL
customAxios.defaults.baseURL = isProd ? HOST_URL : API_BASEURL

AppRegistry.registerComponent(appName, () => () => (
   <Providers>
      <App />
   </Providers>
))
