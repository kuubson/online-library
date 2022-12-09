import axios from 'axios'
import https from 'https'

import type { InitialBody, InitialCookies, InitialQuery, Route } from 'types/express'
import type { LatestReleaseResponse } from 'types/github'

const RELEASES_REPOSITORY = 'kuubson/online-library-releases/releases'

export const getMobileApp: Route<InitialBody, InitialCookies, InitialQuery, 'default', false> = [
   async (_, res, next) => {
      try {
         const response = await axios.get<LatestReleaseResponse>(
            `https://api.github.com/repos/${RELEASES_REPOSITORY}/latest`
         )

         const apk = response.data.assets.find(({ browser_download_url }) =>
            browser_download_url.includes('.apk')
         )

         res.send({ apk: apk?.browser_download_url })
      } catch (error) {
         try {
            // NOTE: it is a fallback, in case a rate limiter kicks in during the first request 🔝
            https
               .request(`https://github.com/${RELEASES_REPOSITORY}`, response => {
                  const data: any[] = []

                  response.on('data', data => data.push(data))

                  response.on('end', () => {
                     const html = data.join()

                     const regex = /v[1-9]+\.[0-9]+\.[0-9]+/ // NOTE: eg. v1.0.8, generated with ChatGPT

                     const versions = html.match(regex)?.filter(v => v.length === 6)

                     if (versions) {
                        const [tag] = versions

                        const apk = `https://github.com/${RELEASES_REPOSITORY}/download/${tag}/app-release.apk`

                        res.send({ apk })
                     }
                  })
               })
               .end()
         } catch (error) {
            next(error)
         }
      }
   },
]
