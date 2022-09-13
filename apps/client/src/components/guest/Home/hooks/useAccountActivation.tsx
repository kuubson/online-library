import { useEffect } from 'react'

import { API } from '@online-library/tools'

import { useQueryParams } from 'hooks'

import { setApiFeedback } from 'helpers'

import { apiAxios, history } from 'utils'

export const useAccountActivation = () => {
   const { activationToken } = useQueryParams()

   const activateAccount = async () => {
      try {
         const { request, header, errors } = API['/api/user/auth/activate-account'].post

         const response = await apiAxios(request, { activationToken })

         if (response) {
            setApiFeedback(header, errors[200], 'Okey', () => history.push('/login'))
         }
      } catch (error) {
         history.push('/login')
      }
   }

   useEffect(() => {
      if (activationToken) {
         activateAccount()
      }
   }, [activationToken])
}
