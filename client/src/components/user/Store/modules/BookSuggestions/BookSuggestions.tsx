import styled from 'styled-components/macro'

import * as Styled from './styled'

import Input from 'components/guest/Registration/modules/Input'

import { useBookSuggestions } from './hooks'

const BookSuggestionsContainer = styled.div`
   width: 50%;
   display: flex;
   justify-content: center;
   align-items: center;
   position: relative;
   @media (max-width: 1100px) {
      width: 100%;
   }
`

const BookSuggestions = ({
   freeBooks,
   paidBooks,
   setFreeBooks,
   setPaidBooks,
   withProfile,
}: IBookSuggestions) => {
   const { title, author, findByTitle, books, setTitle, setAuthor, switchFindBy, handleSort } =
      useBookSuggestions({
         freeBooks,
         paidBooks,
         setFreeBooks,
         setPaidBooks,
         withProfile,
      })
   return (
      <BookSuggestionsContainer>
         {findByTitle ? (
            <Input
               id="title"
               type="text"
               value={title}
               placeholder="Type book's title..."
               onChange={event => setTitle(event.target.value)}
               withBooksSuggestions
            />
         ) : (
            <Input
               id="author"
               type="text"
               value={author}
               placeholder="Type author's name..."
               onChange={event => setAuthor(event.target.value)}
               withBooksSuggestions
            />
         )}
         <Styled.Switcher onClick={switchFindBy}>
            By {findByTitle ? 'author' : 'title'}
         </Styled.Switcher>
         <Styled.SuggestionsContainer>
            {books.map(({ id, title, author, price }) => (
               <Styled.Suggestion key={id} onClick={() => handleSort(id, price)}>
                  "{title}" written by {author}
               </Styled.Suggestion>
            ))}
         </Styled.SuggestionsContainer>
      </BookSuggestionsContainer>
   )
}

export default BookSuggestions
