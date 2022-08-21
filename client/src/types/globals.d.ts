type ReactDispatch<T> = React.Dispatch<React.SetStateAction<T>>

type CheckTokenResponse = {
   role: Role
}

type FBType = any

type GraphqlError = GraphQLError & {
   exception: {
      errorHeader: string
      errorMessage: string
   }
}

type ApiError = {
   response: {
      status: number
      data: GraphqlError['exception']
   }
   request: unknown
}
