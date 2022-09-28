import type { Control } from 'react-hook-form'

import type { Book } from 'gql'

import type { ReactDispatch } from './global'

export type _BooksProps = {
   books: Book[]
   error: string
   header?: string
   hasMore?: boolean
   loadMore?: () => void
   searchBar?: JSX.Element
   withCart?: boolean
   withProfile?: boolean
}

export type BookSuggestionsProps = {
   freeBooks: Book[]
   paidBooks: Book[]
   setFreeBooks: ReactDispatch<Book[]>
   setPaidBooks: ReactDispatch<Book[]>
   withProfile?: boolean
}

export type _InputProps = {
   control: Control<any, any>
   id: string
   label?: string
   type: string
   placeholder: string
   error?: string
}
