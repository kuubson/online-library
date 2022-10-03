import axios from 'axios'
import { useEffect, useState } from 'react'

import type { LatestReleaseResponse } from '../types'

export const useMobile = () => {
   const [apk, setApk] = useState<string>('')

   useEffect(() => {
      const getApk = async () => {
         const response = await axios.get<LatestReleaseResponse>(
            'https://api.github.com/repos/kuubson/online-library-releases/releases/latest'
         )

         const apk = response.data.assets.find(({ browser_download_url }) =>
            browser_download_url.includes('.apk')
         )

         setApk(apk?.browser_download_url || '')
      }
      getApk()
   }, [])

   return { apk }
}
