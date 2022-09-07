import { useEffect } from 'react'

import { RoleContainer } from 'components/shared/styled'

import { useGuest } from './hooks'

type GuestProps = {
   children: React.ReactNode
}

export const Guest = ({ children }: GuestProps) => {
   const { checkToken } = useGuest()

   useEffect(() => {
      checkToken()
   }, [])

   return <RoleContainer>{children}</RoleContainer>
}
