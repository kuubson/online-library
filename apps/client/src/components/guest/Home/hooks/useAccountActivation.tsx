import { useEffect } from 'react'

import { API } from 'online-library'

import { useQueryParams } from 'hooks'

import { setApiFeedback } from 'helpers'

import { axios, history } from 'utils'

const { header, url, post } = API.activateAccount

export const useAccountActivation = () => {
   const { activationToken } = useQueryParams()

   const activateAccount = async () => {
      try {
         await axios.post(url, { activationToken }).then(() => {
            setApiFeedback(header, post[200], 'Okey', () => history.push('/login'))
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
