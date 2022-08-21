import { API } from 'config'

import { email, yup } from 'shared'

import { useForm } from 'hooks'

import { handleApiValidation, setApiFeedback } from 'helpers'

import { axios, history } from 'utils'

const schema = yup.object({ email })

export const useSupport = (withPasswordSupport: boolean | undefined) => {
   const { submit, control, errors, getValues, setError } = useForm({ schema })

   const handleSupport = async () => {
      try {
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
      } catch (error) {
         handleApiValidation(error as ApiError, setError)
      }
   }

   return {
      handleSupport: submit(handleSupport),
      control,
      errors,
   }
}
