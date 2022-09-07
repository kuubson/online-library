import { API } from 'online-library'

import { useForm } from 'hooks'

import { setApiFeedback } from 'helpers'

import { axios, history } from 'utils'

export const useSupport = (withPasswordSupport: boolean | undefined) => {
   const { submit, control, errors, getValues } = useForm(API.recoverPassword.validation)

   const handleSupport = async () => {
      if (withPasswordSupport) {
         await axios
            .post(API.recoverPassword.url, getValues())
            .then(() =>
               setApiFeedback(
                  API.recoverPassword.header,
                  API.recoverPassword.post[200],
                  'Okey',
                  () => history.push('/login')
               )
            )
      } else {
         await axios.post(API.resendActivationToken.url, getValues()).then(() => {
            setApiFeedback(
               API.resendActivationToken.header,
               API.resendActivationToken.post[200],
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
