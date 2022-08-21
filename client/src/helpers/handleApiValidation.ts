type ApiValidationHandler = <T>(error: ApiError, setForm: ReactDispatch<T>) => void

type Response = {
   status: number
   data: {
      results: Result[]
   }
}

type Result = {
   parameter: string
   error: string
}

export const handleApiValidation: ApiValidationHandler = (error, setForm) => {
   const errorResponse: Response = error.response

   if (errorResponse && errorResponse.status === 422) {
      let errors = {}

      errorResponse.data.results.map(
         ({ parameter, error }) =>
            (errors = {
               ...errors,
               [`${parameter}Error`]: error,
            })
      )

      setForm(form => ({
         ...form,
         ...errors,
      }))
   }
}
