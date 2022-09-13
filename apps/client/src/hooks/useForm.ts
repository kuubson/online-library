import { yupResolver } from '@hookform/resolvers/yup'
import { useForm as _useForm } from 'react-hook-form'
import type { DeepPartial } from 'react-hook-form'
import type { InferType } from 'yup'
import type { AssertsShape, ObjectShape, OptionalObjectSchema } from 'yup/lib/object'
import type { TypeOfShape } from 'yup/lib/object'

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
   } = _useForm<InferType<typeof validation>>({
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
