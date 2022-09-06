import * as SharedStyled from 'components/shared/styled'

import { HomeButton, Input } from 'components/shared'

import { useSupport } from './hooks'

type SupportProps = {
   withPasswordSupport?: boolean
}

export const Support = ({ withPasswordSupport }: SupportProps) => {
   const { handleSupport, control, errors } = useSupport(withPasswordSupport)
   return (
      <SharedStyled.GuestContent>
         <HomeButton withReturnButton />
         <SharedStyled.Form onSubmit={handleSupport}>
            <Input
               {...{ control }}
               id="email"
               label="Email"
               type="text"
               placeholder="Type your email address..."
               error={errors.email?.message}
            />
            <SharedStyled.Submit>
               {withPasswordSupport ? 'Recover password' : 'Resend e-mail'}
            </SharedStyled.Submit>
         </SharedStyled.Form>
      </SharedStyled.GuestContent>
   )
}
