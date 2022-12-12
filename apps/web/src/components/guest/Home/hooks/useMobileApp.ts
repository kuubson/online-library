import { useEffect, useState } from 'react'

import { API } from '@online-library/config'

import { defaultAxios } from '@online-library/core'

const { request } = API['/api/mobile-app'].get

export const useMobileApp = () => {
   const [apk, setApk] = useState<string | undefined>()

   useEffect(() => {
      const getApk = async () => {
         try {
            const response = await defaultAxios<never, { apk: string }>(request)
            setApk(response.data.apk)
         } catch (error) {
            setApk(undefined)
         }
      }
      getApk()
   }, [])

   return { apk }
}
