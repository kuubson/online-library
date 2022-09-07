import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components/macro'

import { API } from 'shared'

import { HomeContainer } from 'components/guest/Home/Home'

import { setApiFeedback } from 'helpers'

import { axios, history } from 'utils'

export const Activation = () => {
   const { activationToken } = useParams()

   useEffect(() => {
      const activateAccount = async () => {
         try {
            if (!activationToken) {
               return history.push('/login')
            }
            await axios.post(API.AUTH.activateAccount.url, { activationToken }).then(() => {
               setApiFeedback(
                  API.AUTH.activateAccount.header,
                  API.AUTH.activateAccount.post.responses[200].description,
                  'Okey',
                  () => history.push('/login')
               )
            })
         } catch (error) {
            history.push('/login')
         }
      }
      activateAccount()
   }, [activationToken])

   return <ActivationContainer />
}

const ActivationContainer = styled(HomeContainer)``
