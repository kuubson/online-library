import styled from 'styled-components/macro'

import type { BookSuggestionsProps } from '@online-library/core'

import { useBookSuggestions } from '@online-library/ui'

import { queries } from 'styles'

import * as Styled from './styled'

import { Input } from 'components/shared'

export const BookSuggestions = ({
   freeBooks,
   paidBooks,
   setFreeBooks,
   setPaidBooks,
   withProfile,
}: BookSuggestionsProps) => {
   const { findByTitle, books, switchFindBy, handleSort, control, error } = useBookSuggestions({
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
               {...{ control }}
               id="title"
               type="text"
               placeholder="Type book's title..."
               withBooksSuggestions
            />
         ) : (
            <Input
               {...{ control }}
               id="author"
               type="text"
               placeholder="Type author's name..."
               withBooksSuggestions
            />
         )}
         <Styled.Switcher onClick={switchFindBy}>
            By {findByTitle ? 'author' : 'title'}
         </Styled.Switcher>
         <Styled.SuggestionsContainer>
            {error && <Styled.Suggestion>{error}</Styled.Suggestion>}
            {books.map(({ id, title, author, price }) => (
               <Styled.Suggestion key={id} onClick={() => handleSort(id, price)}>
                  {`"${title}" written by ${author}`}
               </Styled.Suggestion>
            ))}
         </Styled.SuggestionsContainer>
      </BookSuggestionsContainer>
   )
}

const BookSuggestionsContainer = styled.div`
   width: 50%;
   display: flex;
   justify-content: center;
   align-items: center;
   position: relative;
   @media ${queries.mediumDesktop} {
      width: 100%;
   }
`
