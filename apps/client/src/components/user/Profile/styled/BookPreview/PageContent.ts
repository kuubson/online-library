import styled, { css } from 'styled-components'

import { queries } from 'styles'

type StyledProps = {
   back?: boolean
}

export const PageContent = styled.div<StyledProps>`
   width: 100%;
   height: 100%;
   background: #333;
   font-size: 15px;
   backface-visibility: hidden;
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   @media ${queries.largeDesktop} {
      font-size: 14px;
   }
   @media ${queries.smallDesktop} {
      font-size: 13px;
   }
   @media ${queries.tablet} {
      font-size: 12px;
   }
   ${({ back }) =>
      back
         ? css`
              transform: translate(-50%, -50%) rotateY(180deg);
           `
         : null};
`
