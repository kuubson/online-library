import { AccessToken, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk'

import { API, FB_FIELDS } from '@online-library/config'

import type { FBMeRespose } from '@online-library/core'
import { apiAxios, setApiFeedback, setRole } from '@online-library/core'

export const useFbSDK = () => {
   const loginWithFb = async () => {
      const { request, validation, header, responses } = API['/api/user/auth/login/fb'].post
      try {
         const response = await LoginManager.logInWithPermissions(['email', 'public_profile'])

         if (response.isCancelled) {
            return setApiFeedback(header, responses[400])
         }

         const data = await AccessToken.getCurrentAccessToken()

         if (!data) {
            return setApiFeedback(header, responses[400])
         }

         const accessToken = data.accessToken.toString()

         new GraphRequestManager()
            .addRequest(
               new GraphRequest(
                  '/me',
                  {
                     accessToken,
                     parameters: { fields: { string: FB_FIELDS } },
                  },
                  async (error, data) => {
                     if (error) {
                        setApiFeedback(header, responses[400])
                     } else {
                        const { first_name, email } = data as FBMeRespose

                        const response = await apiAxios<typeof validation>(request, {
                           name: first_name,
                           email,
                           access_token: accessToken,
                        })

                        if (response) {
                           setRole('user')
                        }
                     }
                  }
               )
            )
            .start()
      } catch (error) {
         setApiFeedback(header, responses[400])
      }
   }

   return { loginWithFb }
}
