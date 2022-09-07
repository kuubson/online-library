import { Form, GuestContent, Submit } from 'components/shared/styled'

import { HomeButton, Input } from 'components/shared'

import { useSupport } from './hooks'

type SupportProps = {
   withPasswordSupport?: boolean
}

export const Support = ({ withPasswordSupport }: SupportProps) => {
   const { handleSupport, control, errors } = useSupport(withPasswordSupport)
   return (
      <GuestContent>
         <HomeButton withReturnButton />
         <Form onSubmit={handleSupport}>
            <Input
               {...{ control }}
               id="email"
               label="Email"
               type="text"
               placeholder="Type your email address..."
               error={errors.email?.message}
            />
            <Submit>{withPasswordSupport ? 'Recover password' : 'Resend e-mail'}</Submit>
         </Form>
      </GuestContent>
   )
}
