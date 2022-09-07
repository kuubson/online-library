import styled, { css } from 'styled-components/macro'

import { queries } from 'styles'

type StyledProps = {
   shouldMenuExpand?: boolean
   counter?: number
}

export const Option = styled.li<StyledProps>`
   font-size: 17px;
   margin-right: 40px;
   cursor: pointer;
   position: relative;
   :last-of-type {
      margin-right: 0px;
   }
   @media ${queries.largeDesktop} {
      font-size: 16px;
      margin-right: 35px;
   }
   @media ${queries.desktop} {
      font-size: 15px;
      margin-right: 30px;
   }
   @media ${queries.largeTablet} {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 0px;
      margin-bottom: 25px;
      :last-of-type {
         margin-bottom: 0px;
      }
   }
   @media ${queries.minLargeTablet} {
      opacity: 1;
   }
   @media ${queries.smallTablet} {
      font-size: 14px;
   }
   ${({ shouldMenuExpand }) =>
      shouldMenuExpand
         ? css`
              opacity: 1;
              transition: opacity 0.5s ease-in-out;
           `
         : css`
              opacity: 0;
              transition: opacity 0.25s ease-in-out;
           `}
   ${({ counter }) =>
      counter
         ? css`
              ::after {
                 width: 18px;
                 height: 18px;
                 cursor: initial;
                 content: '${counter}';
                 padding-top: 0.5px;
                 padding-left: 1.5px;
                 font-size: 11px;
                 font-weight: bold;
                 color: black;
                 background: white;
                 border-radius: 50%;
                 display: flex;
                 justify-content: center;
                 align-items: center;
                 position: absolute;
                 top: -18px;
                 right: -18px;
                 @media ${queries.largeTablet} {
                    position: static;
                    margin-left: 8px;
                 }
              }
           `
         : null}
`
