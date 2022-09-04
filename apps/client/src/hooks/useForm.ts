import { yupResolver } from '@hookform/resolvers/yup'
import { useForm as _useForm } from 'react-hook-form'
import type { InferType } from 'yup'
import type { ObjectShape, OptionalObjectSchema } from 'yup/lib/object'

export const useForm = <T extends ObjectShape>(validation: OptionalObjectSchema<T>) => {
   const {
      handleSubmit: submit,
      control,
      formState: { errors },
      watch,
      setValue,
      getValues,
      reset,
   } = _useForm<InferType<typeof validation>>({ resolver: yupResolver(validation) })
   return {
      submit,
      control,
      errors,
      watch,
      setValue,
      getValues,
      reset,
   }
}
