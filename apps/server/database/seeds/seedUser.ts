import axios from 'axios'

import { API, SERVER_URL } from '@online-library/config'

const { request } = API['/api/testing/seed-user'].get

export const seedUser = async () => {
   try {
      await axios.request({
         method: request.method,
         url: `${SERVER_URL}${request.url}`,
      })
      console.log('✔️ New user seeded')
   } catch (error) {
      console.log('❌ Seeding user failed')
   }
}
