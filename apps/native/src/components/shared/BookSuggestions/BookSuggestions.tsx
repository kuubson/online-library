import React from 'react'
import styled from 'styled-components/native'

import type { BookSuggestionsProps } from '@online-library/core'
import { t } from '@online-library/core'

import { useBookSuggestions } from '@online-library/logic'

import { moderateScale } from 'styles'

import * as Styled from './styled'

import { Input } from '../Input/Input'

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
         <Styled.InputContainer>
            {findByTitle ? (
               <Input
                  {...{ control }}
                  id="title"
                  type="text"
                  placeholder="Type book's title..."
                  noMarginBottom
               />
            ) : (
               <Input
                  {...{ control }}
                  id="author"
                  type="text"
                  placeholder="Type author's name..."
                  noMarginBottom
               />
            )}
            <Styled.SwitcherContainer onPress={switchFindBy}>
               <Styled.Switcher>
                  {findByTitle
                     ? t('suggestionsInput.findByTitle')
                     : t('suggestionsInput.findByAuthor')}
               </Styled.Switcher>
            </Styled.SwitcherContainer>
         </Styled.InputContainer>
         <Styled.Suggestions>
            {!!error && <Styled.Suggestion>{error}</Styled.Suggestion>}
            {books.map(({ id, title, author, price }) => (
               <Styled.Suggestion key={id} onPress={() => handleSort(id, price)}>
                  {`"${title}" ${t('suggestionsInput.writtenBy')} ${author}`}
               </Styled.Suggestion>
            ))}
         </Styled.Suggestions>
      </BookSuggestionsContainer>
   )
}

const BookSuggestionsContainer = styled.View`
   width: 100%;
   margin-bottom: ${moderateScale(30)}px;
`
