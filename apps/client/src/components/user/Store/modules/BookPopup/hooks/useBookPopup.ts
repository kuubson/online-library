import { useBorrowBookMutation } from 'gql'

import { useCart } from 'hooks'

import { setApiFeedback } from 'helpers'

import type { SetBookPopupDataFn } from 'types'

type UseBookPopupProps = {
   id: number
   setBookPopupData: SetBookPopupDataFn
}

export const useBookPopup = ({ id, setBookPopupData }: UseBookPopupProps) => {
   const [borrowBook] = useBorrowBookMutation({ variables: { bookId: id } })

   const { cart, addToCart } = useCart()

   const handleBorrowingBook = async () => {
      try {
         const { data } = await borrowBook()
         if (data) {
            const { title, author } = data.borrowBook

            setBookPopupData(undefined)

            setApiFeedback(
               'Borrowing a book',
               `Successfully borrowed the "${title}" written by ${author}. Check your profile`
            )
         }
      } catch (error) {
         setBookPopupData(undefined)
      }
   }

   const handleAdddingToCart = async (id: number) => {
      if (cart.includes(id)) {
         setBookPopupData(undefined)
         return setApiFeedback('Buying a book', 'This book is already in the cart')
      }

      addToCart(id)

      setBookPopupData(undefined)

      setApiFeedback('Buying a book', 'The book has been added to the cart')
   }

   return {
      handleBorrowingBook,
      handleAdddingToCart,
   }
}
