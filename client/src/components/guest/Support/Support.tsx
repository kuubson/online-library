import styled from 'styled-components'

import { RegistrationContainer } from 'components/guest/Registration/Registration'
import HomeButton from 'components/guest/Registration/modules/HomeButton'
import Input from 'components/guest/Registration/modules/Input'
import * as StyledRegistration from 'components/guest/Registration/styled'

import { useSupport } from './hooks'

const UserSupportContainer = styled(RegistrationContainer)``

interface ISupport {
   withPasswordSupport?: boolean
}

const Support = ({ withPasswordSupport }: ISupport) => {
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

export default Support
