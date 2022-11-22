import styled from 'styled-components'

import { queries } from 'styles'

export const Textarea = styled.textarea`
   width: 100%;
   height: 100%;
   background: transparent;
   padding: 15px;
   border: none;
   resize: none;
   ::placeholder {
      color: white;
   }
   ::-webkit-scrollbar {
      display: none;
   }
   @media ${queries.largeTablet} {
      font-size: 11px;
      letter-spacing: 1px;
   }
`
