import { API, email, yup } from 'online-library'

import { useForm } from 'hooks'

import { setApiFeedback } from 'helpers'

import { axios, history } from 'utils'

const schema = yup.object({ email })

export const useSupport = (withPasswordSupport: boolean | undefined) => {
   const { submit, control, errors, getValues } = useForm({ schema })

   const handleSupport = async () => {
      if (withPasswordSupport) {
         await axios.post(API.AUTH.recoverPassword.url, getValues()).then(() => {
            setApiFeedback(
               'Password recovery',
               'An e-mail with an password recovery link for your account has been sent',
               'Okey',
               () => history.push('/login')
            )
         })
      } else {
         await axios.post(API.AUTH.resendActivationToken.url, getValues()).then(() => {
            setApiFeedback(
               API.AUTH.resendActivationToken.header,
               API.AUTH.resendActivationToken.post.responses[200].description,
               'Okey',
               () => history.push('/login')
            )
         })
      }
   }

   return {
      handleSupport: submit(handleSupport),
      control,
      errors,
   }
}
