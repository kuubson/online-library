import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import styled from 'styled-components/macro'

import { API } from 'shared'

import { HomeContainer } from 'components/guest/Home/Home'

import { setApiFeedback } from 'helpers'

import { axios, history } from 'utils'

export const Authentication = () => {
   const { token } = useParams()

   useEffect(() => {
      const authenticateEmail = async () => {
         try {
            if (!token) {
               return history.push('/login')
            }
            await axios.post(API.AUTH.authenticateEmail.url, { token }).then(() => {
               setApiFeedback(
                  'Email address authentication',
                  'Your email address has been successfully authenticated, you can login now',
                  'Okey',
                  () => history.push('/login')
               )
            })
         } catch (error) {
            history.push('/login')
         }
      }
      authenticateEmail()
   }, [token])

   return <AuthenticationContainer />
}

const AuthenticationContainer = styled(HomeContainer)``
