import { Form, Submit } from 'components/shared/styled'

import { HomeButton, Input } from 'components/shared'

import { usePasswordReset } from './hooks'

export const PasswordReset = () => {
   const { changePassword, control, errors } = usePasswordReset()
   return (
      <>
         <HomeButton />
         <Form onSubmit={changePassword}>
            <Input
               {...{ control }}
               id="password"
               label="Password"
               type="password"
               placeholder="Enter password..."
               error={errors.password?.message}
            />
            <Input
               {...{ control }}
               id="repeatedPassword"
               label="Repeat Password"
               type="password"
               placeholder="Enter password again..."
               error={errors.repeatedPassword?.message}
            />
            <Submit>Change password</Submit>
         </Form>
      </>
   )
}
