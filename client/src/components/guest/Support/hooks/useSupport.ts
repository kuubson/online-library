import { API } from 'config'

import { email, yup } from 'shared'

import { useForm } from 'hooks'

import { setApiFeedback } from 'helpers'

import { axios, history } from 'utils'

const schema = yup.object({ email })

export const useSupport = (withPasswordSupport: boolean | undefined) => {
   const { submit, control, errors, getValues } = useForm({ schema })

   const handleSupport = async () => {
      await axios.post(API.passwordSupport(withPasswordSupport), getValues())

      if (withPasswordSupport) {
         return setApiFeedback(
            'Password recovery',
            'An e-mail with an password recovery link for your account has been sent',
            'Okey',
            () => history.push('/login')
         )
      }

      setApiFeedback(
         'E-mail resending',
         'An e-mail with an activation link for your account has been resent',
         'Okey',
         () => history.push('/login')
      )
   }

   return {
      handleSupport: submit(handleSupport),
      control,
      errors,
   }
}
