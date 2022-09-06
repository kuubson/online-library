import { yupResolver } from '@hookform/resolvers/yup'
import type { DeepPartial } from 'react-hook-form'
import { useForm as _useForm } from 'react-hook-form'
import type { AssertsShape, ObjectShape, OptionalObjectSchema, TypeOfShape } from 'yup/lib/object'

export const useForm = <T extends ObjectShape>(
   validation: OptionalObjectSchema<T>,
   defaultValues?: DeepPartial<AssertsShape<T>> | DeepPartial<Extract<TypeOfShape<T>, null>>
) => {
   const {
      handleSubmit: submit,
      control,
      formState: { errors },
      watch,
      setValue,
      getValues,
      reset,
   } = _useForm({
      resolver: yupResolver(validation),
      defaultValues,
   })
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
