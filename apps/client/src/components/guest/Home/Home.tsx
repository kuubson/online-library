import * as Styled from './styled'
import { HomeContainer } from 'components/shared/styled'

import { useHome } from './hooks'

import { history } from 'utils'

export const Home = () => {
   useHome()
   return (
      <HomeContainer>
         <Styled.HeaderContainer>
            <Styled.Header>Online Library</Styled.Header>
            <Styled.Buttons>
               <Styled.Button onClick={() => history.push('/login')}>Login</Styled.Button>
               <Styled.Button onClick={() => history.push('/registration')}>Register</Styled.Button>
            </Styled.Buttons>
         </Styled.HeaderContainer>
         <Styled.AdvantagesContainer>
            <Styled.Advantage>The largest resource of books in the internet</Styled.Advantage>
            <Styled.Advantage>Top books from top authors for free</Styled.Advantage>
            <Styled.Advantage>The lowest pricing for premium books</Styled.Advantage>
         </Styled.AdvantagesContainer>
      </HomeContainer>
   )
}
