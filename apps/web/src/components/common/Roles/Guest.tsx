import styled from 'styled-components/macro'

import type { ReactChildren } from '@online-library/core'

import { useGuest } from '@online-library/logic'

import { RoleContainer } from 'components/shared/styled'

export const Guest = ({ children }: ReactChildren) => {
   useGuest()
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
