import { useLocation } from 'react-router'

import styled, { css } from 'styled-components/macro'

import * as Styled from './styled'

import { useMenu } from './hooks'

import { history } from 'utils'

type StyledProps = {
   shouldMenuStick?: boolean
}

const MenuContainer = styled.nav<StyledProps>`
   width: calc(100% - 40px);
   height: 90px;
   padding: 0px 30px;
   background: ${({ theme }) => theme.mainColor};
   display: flex;
   justify-content: space-between;
   align-items: center;
   transition: width 0.3s ease-in-out, right 0.3s ease-in-out, left 0.3s ease-in-out;
   position: absolute;
   top: 20px;
   left: 20px;
   right: 20px;
   @media (max-width: 800px) {
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

interface IMenu {
   options: Option[]
   _setShouldMenuExpand: ReactDispatch<boolean>
}

type Option = {
   option: string
   pathname?: string
   counter?: number
}

const Menu = ({ options, _setShouldMenuExpand }: IMenu) => {
   const location = useLocation()
   const { shouldMenuExpand, shouldMenuStick, setShouldMenuExpand, logout } =
      useMenu(_setShouldMenuExpand)
   return (
      <MenuContainer shouldMenuStick={shouldMenuStick}>
         <Styled.Logo>Online Library</Styled.Logo>
         <Styled.LinesContainer
            onClick={() => setShouldMenuExpand(shouldMenuExpand => !shouldMenuExpand)}
            shouldMenuExpand={shouldMenuExpand}
         >
            <Styled.Line shouldMenuExpand={shouldMenuExpand} />
            <Styled.Line shouldMenuExpand={shouldMenuExpand} />
            <Styled.Line shouldMenuExpand={shouldMenuExpand} />
         </Styled.LinesContainer>
         <Styled.OptionsContainer shouldMenuExpand={shouldMenuExpand}>
            {options.map(
               ({ option, pathname, counter }) =>
                  location.pathname !== pathname && (
                     <Styled.Option
                        key={option}
                        onClick={() =>
                           option === 'Logout' ? logout() : history.push(`${pathname}`)
                        }
                        shouldMenuExpand={shouldMenuExpand}
                        counter={counter}
                     >
                        {option}
                     </Styled.Option>
                  )
            )}
         </Styled.OptionsContainer>
      </MenuContainer>
   )
}

export default Menu
