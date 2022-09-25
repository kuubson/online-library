import { bookPopupActions, initialState } from '@redux/reducers/bookPopup'

import { useAction, useCart, useSelector } from 'hooks'

import { setApiFeedback } from 'helpers'

import { useBorrowBookMutation } from 'types'

export const useBookPopup = () => {
   const {
      data: { id, title, author, cover, price, withProfile },
   } = useSelector(state => state.bookPopup)

   const [_borrowBook] = useBorrowBookMutation({ variables: { bookId: id } })

   const setBookPopupData = useAction(bookPopupActions.setBookPopup)

   const { cart, addToCart: _addToCard } = useCart()

   const resetBookPopup = () => setBookPopupData(initialState.data)

   const borrowBook = async () => {
      try {
         const { data } = await _borrowBook()
         if (data) {
            const { title, author } = data.borrowBook

            resetBookPopup()

            setApiFeedback(
               'Borrowing a book',
               `Successfully borrowed the "${title}" written by ${author}. Check profile tab`
            )
         }
      } catch (error) {
         resetBookPopup()
      }
   }

   const addToCart = async (id: number) => {
      if (cart.includes(id)) {
         resetBookPopup()
         return setApiFeedback('Buying a book', 'This book is already in the cart')
      }

      _addToCard(id)

      resetBookPopup()

      setApiFeedback('Buying a book', 'The book has been added to the cart')
   }

   const showBookPopup = !!id && !!title && !!author && !!cover

   return {
      id,
      title,
      author,
      cover,
      price,
      withProfile,
      showBookPopup,
      setBookPopupData,
      resetBookPopup,
      borrowBook,
      addToCart,
   }
}
