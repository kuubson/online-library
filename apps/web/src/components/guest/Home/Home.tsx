import styled from 'styled-components/macro'

import { history } from '@online-library/core'

import { queries } from 'styles'

import * as Styled from './styled'
import { RoleContainer } from 'components/shared/styled'

import { MobileImage } from 'components/shared'

import { useAccountActivation } from './hooks'

export const Home = () => {
   useAccountActivation()
   return (
      <HomeContainer>
         <Styled.HeaderContainer>
            <Styled.Header>Online Library</Styled.Header>
            <Styled.Buttons>
               <Styled.Button onClick={() => history.push('/login')}>Login</Styled.Button>
               <Styled.Button onClick={() => history.push('/registration')}>Register</Styled.Button>
            </Styled.Buttons>
            <MobileImage onlyBadges />
         </Styled.HeaderContainer>
         <MobileImage />
         <Styled.Advantages>
            <Styled.Advantage>the largest book resource on the internet</Styled.Advantage>
            <Styled.Advantage>the best books from the best authors for free</Styled.Advantage>
            <Styled.Advantage>cross-platform mobile app</Styled.Advantage>
            <Styled.Advantage>the lowest prices of premium books</Styled.Advantage>
         </Styled.Advantages>
      </HomeContainer>
   )
}

const HomeContainer = styled(RoleContainer)`
   width: 100%;
   height: 100%;
   padding: 0px 50px;
   display: flex;
   justify-content: space-around;
   align-items: center;
   @media ${queries.largeTablet} {
      flex-direction: column;
   }
`
