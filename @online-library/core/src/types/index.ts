import type { ReactDispatch } from './global'
import type { Book } from './graphql'

export type BookSuggestionsProps = {
   freeBooks: Book[]
   paidBooks: Book[]
   setFreeBooks: ReactDispatch<Book[]>
   setPaidBooks: ReactDispatch<Book[]>
   withProfile?: boolean
}

export * from './api'
export * from './axios'
export * from './global'
export * from './graphql'
export * from './navigation.native'
