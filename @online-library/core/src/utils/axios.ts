import axios from 'axios'

import type { AxiosOverload, AxiosOverloadArgs } from 'types'

export const defaultAxios: AxiosOverload = (...[request, data]: Parameters<AxiosOverloadArgs>) =>
   axios.request({
      ...request,
      data,
   })
