type CheckTokenResponse = {
   role: Role
}

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
