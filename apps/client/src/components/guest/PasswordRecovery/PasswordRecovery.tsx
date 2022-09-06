import * as SharedStyled from 'components/shared/styled'

import { HomeButton, Input } from 'components/shared'

import { usePasswordRecovery } from './hooks'

export const PasswordRecovery = () => {
   const { changePassword, control, errors } = usePasswordRecovery()
   return (
      <SharedStyled.GuestContent>
         <HomeButton />
         <SharedStyled.Form onSubmit={changePassword}>
            SharedStyled.{' '}
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
            <SharedStyled.Submit>Change password</SharedStyled.Submit>
         </SharedStyled.Form>
      </SharedStyled.GuestContent>
   )
}
