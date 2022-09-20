import { useEffect } from 'react'
import styled from 'styled-components/macro'

import type { ReactChildren } from '@online-library/core'

import { RoleContainer } from 'components/shared/styled'

import { useGuest } from './hooks'

export const Guest = ({ children }: ReactChildren) => {
   const { checkAuth } = useGuest()

   useEffect(() => {
      checkAuth()
   }, [])

   return (
      <RoleContainer>
         <GuestContent>{children}</GuestContent>
      </RoleContainer>
   )
}

const GuestContent = styled.section`
   width: 100%;
   min-height: 100%;
   padding: 96px 0px 35px 0px;
   display: flex;
   align-items: center;
`
