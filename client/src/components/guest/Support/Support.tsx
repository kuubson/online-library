import styled from 'styled-components/macro'

import { RegistrationContainer } from 'components/guest/Registration/Registration'
import { HomeButton, Input } from 'components/guest/Registration/modules'
import * as StyledRegistration from 'components/guest/Registration/styled'

import { useSupport } from './hooks'

type SupportProps = {
   withPasswordSupport?: boolean
}

export const Support = ({ withPasswordSupport }: SupportProps) => {
   const {
      form: { email, emailError },
      formHandler: { handleInputValue, validateEmail },
      handleSupport,
   } = useSupport(withPasswordSupport)
   return (
      <UserSupportContainer>
         <HomeButton withReturnButton />
         <StyledRegistration.Form onSubmit={handleSupport}>
            <Input
               id="email"
               label="Email"
               type="text"
               value={email}
               placeholder="Type your email address..."
               error={emailError}
               onChange={event => {
                  handleInputValue(event)
                  validateEmail(event.target.value)
               }}
            />
            <StyledRegistration.Submit>
               {withPasswordSupport ? 'Recover password' : 'Resend e-mail'}
            </StyledRegistration.Submit>
         </StyledRegistration.Form>
      </UserSupportContainer>
   )
}

const UserSupportContainer = styled(RegistrationContainer)``
