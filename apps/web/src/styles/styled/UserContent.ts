import styled from 'styled-components/macro'

import { queries } from 'styles'

type StoreContainerProps = {
   shouldMenuExpand?: boolean
}

export const UserContent = styled.section<StoreContainerProps>`
   min-height: 100%;
   display: flex;
   justify-content: center;
   align-items: flex-start;
   transition: padding 0.4s ease-in-out;
   @media ${queries.minLargeTablet} {
      padding: 130px 20px 20px 20px;
   }
   @media ${queries.largeTablet} {
      flex-direction: column;
      padding: ${({ shouldMenuExpand }) =>
         shouldMenuExpand ? '330px 20px 20px 20px' : '120px 20px 20px 20px'};
   }
`
