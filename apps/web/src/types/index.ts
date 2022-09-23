import type { Book } from 'gql'

export * from './api'

export type SetBookPopupDataFn = ReactDispatch<Book | undefined>

export type BookSuggestionsProps = {
   freeBooks: Book[]
   paidBooks: Book[]
   setFreeBooks: ReactDispatch<Book[]>
   setPaidBooks: ReactDispatch<Book[]>
   withProfile?: boolean
}
