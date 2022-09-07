import styled from 'styled-components/macro'

import { RegistrationContainer } from 'components/guest/Registration/Registration'
import { HomeButton, Input } from 'components/guest/Registration/modules'
import * as StyledRegistration from 'components/guest/Registration/styled'

import { usePasswordRecovery } from './hooks'

export const PasswordRecovery = () => {
   const { changePassword, control, errors } = usePasswordRecovery()
   return (
      <UserPasswordRecoveryContainer>
         <HomeButton />
         <StyledRegistration.Form onSubmit={changePassword}>
            <Input
               {...{ control }}
               id="password"
               label="Password"
               type="password"
               placeholder="Type your password..."
               error={errors.password?.message}
            />
            <Input
               {...{ control }}
               id="repeatedPassword"
               label="Repeat Password"
               type="password"
               placeholder="Type your password again..."
               error={errors.repeatedPassword?.message}
            />
            <StyledRegistration.Submit>Change password</StyledRegistration.Submit>
         </StyledRegistration.Form>
      </UserPasswordRecoveryContainer>
   )
}

const UserPasswordRecoveryContainer = styled(RegistrationContainer)``
