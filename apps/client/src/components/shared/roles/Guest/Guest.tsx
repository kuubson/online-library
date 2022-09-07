import { useEffect } from 'react'
import styled from 'styled-components/macro'

import { useGuest } from './hooks'

type GuestProps = {
   children: React.ReactNode
}

export const Guest = ({ children }: GuestProps) => {
   const { checkToken } = useGuest()

   useEffect(() => {
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
