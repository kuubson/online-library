import type { Book } from 'gql'

export type BookSuggestionsProps = {
   freeBooks: Book[]
   paidBooks: Book[]
   setFreeBooks: ReactDispatch<Book[]>
   setPaidBooks: ReactDispatch<Book[]>
   withProfile?: boolean
}
