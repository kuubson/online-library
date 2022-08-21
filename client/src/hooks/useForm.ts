import { yupResolver } from '@hookform/resolvers/yup'
import { useForm as _useForm } from 'react-hook-form'
import type { InferType } from 'yup'
import type { ObjectShape, OptionalObjectSchema } from 'yup/lib/object'

type UseFormProps<T extends ObjectShape> = {
   schema: OptionalObjectSchema<T>
}

export const useForm = <T extends ObjectShape>({ schema }: UseFormProps<T>) => {
   const {
      handleSubmit: submit,
      control,
      formState: { errors },
      watch,
      setValue,
      getValues,
      reset,
      setError,
   } = _useForm<InferType<typeof schema>>({ resolver: yupResolver(schema) })
   return {
      submit,
      control,
      errors,
      watch,
      setValue,
      getValues,
      reset,
      setError,
   }
}
