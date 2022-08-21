import { gql, useMutation } from '@apollo/client'

import { useCart } from 'hooks'

import { setApiFeedback } from 'helpers'

import { history } from 'utils'

type Mutation = {
   borrowBook: {
      title: string
      author: string
   }
}

const BORROW_BOOK = gql`
   mutation ($bookId: Int!) {
      borrowBook(bookId: $bookId) {
         title
         author
      }
   }
`

type UseBookPopupProps = {
   id: number
   setBookPopupData: ReactDispatch<BookType | undefined>
}

export const useBookPopup = ({ id, setBookPopupData }: UseBookPopupProps) => {
   const [borrowBook] = useMutation<Mutation>(BORROW_BOOK)

   const { cart, addToCart } = useCart()

   const handleBorrowingBook = async () => {
      try {
         const { data } = await borrowBook({ variables: { bookId: id } })
         if (data) {
            const { title, author } = data.borrowBook

            setBookPopupData(undefined)

            setApiFeedback(
               'Borrowing a book',
               `You have successfully borrowed a book "${title}" written by ${author}`,
               'Check it out in your profile',
               () => history.push('/profile')
            )
         }
      } catch (error) {
         setBookPopupData(undefined)
      }
   }

   const handleAdddingToCart = async (id: number) => {
      if (cart.includes(id)) {
         setBookPopupData(undefined)
         return setApiFeedback('Buying a book', 'This book is already in the cart', 'Okey')
      }

      addToCart(id)

      setBookPopupData(undefined)

      setApiFeedback('Buying a book', 'The book has been added to the cart', 'Okey')
   }

   return {
      handleBorrowingBook,
      handleAdddingToCart,
   }
}
