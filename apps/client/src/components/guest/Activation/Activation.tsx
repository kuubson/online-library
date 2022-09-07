import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components/macro'

import { API } from 'online-library'

import { HomeContainer } from 'components/guest/Home/Home'

import { setApiFeedback } from 'helpers'

import { axios, history } from 'utils'

const { header, url, post } = API.activateAccount

export const Activation = () => {
   const { activationToken } = useParams()

   useEffect(() => {
      const activateAccount = async () => {
         try {
            if (!activationToken) {
               return history.push('/login')
            }
            await axios.post(url, { activationToken }).then(() => {
               setApiFeedback(header, post[200], 'Okey', () => history.push('/login'))
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
