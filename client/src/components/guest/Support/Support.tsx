import styled from 'styled-components/macro'

import { RegistrationContainer } from 'components/guest/Registration/Registration'
import { HomeButton, Input } from 'components/guest/Registration/modules'
import * as StyledRegistration from 'components/guest/Registration/styled'

import { useSupport } from './hooks'

type SupportProps = {
   withPasswordSupport?: boolean
}

export const Support = ({ withPasswordSupport }: SupportProps) => {
   const { handleSupport, control, errors } = useSupport(withPasswordSupport)
   return (
      <UserSupportContainer>
         <HomeButton withReturnButton />
         <StyledRegistration.Form onSubmit={handleSupport}>
            <Input
               {...{ control }}
               id="email"
               label="Email"
               type="text"
               placeholder="Type your email address..."
               error={errors.email?.message}
            />
            <StyledRegistration.Submit>
               {withPasswordSupport ? 'Recover password' : 'Resend e-mail'}
            </StyledRegistration.Submit>
         </StyledRegistration.Form>
      </UserSupportContainer>
   )
}

const UserSupportContainer = styled(RegistrationContainer)``
