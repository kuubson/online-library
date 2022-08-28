import axios from 'axios'
import { useEffect } from 'react'

import styled from 'styled-components/macro'

import { API } from 'shared'

import { useSocket } from 'hooks'

import { handleApiError } from 'helpers'

import { history } from 'utils'

type GuestProps = {
   children: React.ReactNode
}

export const Guest = ({ children }: GuestProps) => {
   const { closeSocketConnection } = useSocket()

   useEffect(() => {
      const checkToken = async () => {
         try {
            const response = await axios.get<CheckTokenResponse>(API.GLOBAL.checkToken.url)

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
