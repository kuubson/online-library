import { useEffect } from 'react'

import { API } from '@online-library/tools'

import { useQueryParams } from 'hooks'

import { setApiFeedback } from 'helpers'

import { apiAxios, history } from 'utils'

const { post } = API['/api/user/auth/activate-account']

export const useAccountActivation = () => {
   const { activationToken } = useQueryParams()

   const activateAccount = async () => {
      try {
         await apiAxios(post, { activationToken }).then(() => {
            setApiFeedback(post.header, post.errors[200], 'Okey', () => history.push('/login'))
         })
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
