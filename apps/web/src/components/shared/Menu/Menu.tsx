import { useLocation } from 'react-router'
import styled, { css } from 'styled-components/macro'

import { history } from '@online-library/core'

import { queries } from 'styles'

import * as Styled from './styled'

import { useMenu } from './hooks'

type MenuProps = {
   options: {
      option: string
      pathname?: string
      counter?: number
   }[]
}

export const Menu = ({ options }: MenuProps) => {
   const location = useLocation()

   const { shouldMenuExpand, shouldMenuStick, setShouldMenuExpand, logout } = useMenu()

   const menuProps = { shouldMenuExpand }

   return (
      <MenuContainer shouldMenuStick={shouldMenuStick}>
         <Styled.Logo>Online Library</Styled.Logo>
         <Styled.LinesContainer
            onClick={() => setShouldMenuExpand(shouldMenuExpand => !shouldMenuExpand)}
            {...menuProps}
         >
            <Styled.Line {...menuProps} />
            <Styled.Line {...menuProps} />
            <Styled.Line {...menuProps} />
         </Styled.LinesContainer>
         <Styled.OptionsContainer {...menuProps}>
            {options.map(({ option, pathname, counter }) => {
               const handleOnClick = () => {
                  if (option === 'Logout') {
                     return logout()
                  }
                  history.push(`${pathname}`)
                  setShouldMenuExpand(false)
               }
               if (location.pathname !== pathname) {
                  return (
                     <Styled.Option
                        {...menuProps}
                        key={option}
                        onClick={handleOnClick}
                        counter={counter}
                     >
                        {option}
                     </Styled.Option>
                  )
               }
            })}
         </Styled.OptionsContainer>
      </MenuContainer>
   )
}

type MenuContainerProps = {
   shouldMenuStick?: boolean
}

const MenuContainer = styled.nav<MenuContainerProps>`
   width: calc(100% - 40px);
   height: 90px;
   padding: 0px 30px;
   background: ${({ theme }) => theme.colors.primary};
   display: flex;
   justify-content: space-between;
   align-items: center;
   transition: width 0.3s ease-in-out, right 0.3s ease-in-out, left 0.3s ease-in-out;
   position: absolute;
   top: 20px;
   left: 20px;
   right: 20px;
   @media ${queries.largeTablet} {
      height: 80px;
      padding: 0px 25px 0px 20px;
   }
   ${({ shouldMenuStick }) =>
      shouldMenuStick
         ? css`
              width: 100%;
              position: fixed;
              top: 0px;
              right: 0px;
              left: 0px;
              z-index: 3;
           `
         : null};
`
