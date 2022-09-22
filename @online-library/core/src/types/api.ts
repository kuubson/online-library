export type Methods = 'get' | 'post' | 'put' | 'patch' | 'delete'

export type Method<M, E extends keyof any, V> = {
   readonly request: {
      readonly method: M
      readonly url: string
   }
   validation: V extends null ? null : V
   header: string
   errors: Record<E, string>
}
