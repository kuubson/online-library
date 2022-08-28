import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import styled from 'styled-components/macro'

import { API } from 'shared'

import { HomeContainer } from 'components/guest/Home/Home'

import { setApiFeedback } from 'helpers'

import { axios, history } from 'utils'

export const Authentication = () => {
   const { activationToken } = useParams()

   useEffect(() => {
      const authenticateEmail = async () => {
         try {
            if (!activationToken) {
               return history.push('/login')
            }
            await axios.post(API.AUTH.authenticateEmail.url, { activationToken }).then(() => {
               setApiFeedback(
                  API.AUTH.authenticateEmail.header,
                  API.AUTH.authenticateEmail.post.responses[200].description,
                  'Okey',
                  () => history.push('/login')
               )
            })
         } catch (error) {
            history.push('/login')
         }
      }
      authenticateEmail()
   }, [activationToken])

   return <AuthenticationContainer />
}

const AuthenticationContainer = styled(HomeContainer)``
