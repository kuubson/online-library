type BookType = {
   id: number
   title: string
   author: string
   cover: string
   price: number
   setBookPopupData?: ReactDispatch<BookType | undefined>
   withCart?: boolean
   withProfile?: boolean
   withPopup?: boolean
   withFlips?: boolean
}

interface IBookSuggestions {
   freeBooks: BookType[]
   paidBooks: BookType[]
   setFreeBooks: ReactDispatch<BookType[]>
   setPaidBooks: ReactDispatch<BookType[]>
   withProfile?: boolean
}
