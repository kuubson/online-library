import axios from 'axios'
import React, { useEffect } from 'react'

import styled from 'styled-components/macro'

import { API } from 'config'

import { useSocket } from 'hooks'

import { handleApiError } from 'helpers'

import { history } from 'utils'

export const Guest: React.FC = ({ children }) => {
   const { closeSocketConnection } = useSocket()

   useEffect(() => {
      const checkToken = async () => {
         try {
            const response = await axios.get<CheckTokenResponse>(API.checkToken)

            if (response) {
               const { role } = response.data

               if (role === 'user') {
                  return history.push('/store')
               }

               closeSocketConnection()
            }
         } catch (error) {
            handleApiError(error as ApiError)
         }
      }
      checkToken()
   }, [])

   return <GuestContainer>{children}</GuestContainer>
}

export const GuestContainer = styled.section`
   height: 100%;
   background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
      url('https://picsum.photos/1920/1080') center center no-repeat;
   background-size: cover;
   backface-visibility: hidden;
`
