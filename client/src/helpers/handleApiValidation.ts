import type { UseFormSetError } from 'react-hook-form'

type Response = {
   status: number
   data: {
      results: {
         parameter: string
         error: string
      }[]
   }
}

export const handleApiValidation = (error: ApiError, setError: UseFormSetError<any>) => {
   const errorResponse: Response = error.response
   if (errorResponse && errorResponse.status === 422) {
      errorResponse.data.results.map(({ parameter, error }) => {
         setError(parameter, { message: error })
      })
   }
}
