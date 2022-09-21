import { Form, Submit } from 'components/shared/styled'

import { HomeButton, Input } from 'components/shared'

import { useSupport } from './hooks'

type SupportProps = {
   withPasswordSupport?: boolean
}

export const Support = ({ withPasswordSupport }: SupportProps) => {
   const { handleSupport, control, errors } = useSupport(withPasswordSupport)
   return (
      <>
         <HomeButton withReturnButton />
         <Form onSubmit={handleSupport}>
            <Input
               {...{ control }}
               id="email"
               label="Email"
               type="text"
               placeholder="Enter email address..."
               error={errors.email?.message}
            />
            <Submit>{withPasswordSupport ? 'Recover password' : 'Resend e-mail'}</Submit>
         </Form>
      </>
   )
}
