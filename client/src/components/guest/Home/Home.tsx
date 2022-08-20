import styled from 'styled-components'

import * as Styled from './styled'

import { history } from 'utils'

export const HomeContainer = styled.section`
   height: 100%;
   background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
      url('https://picsum.photos/1920/1080') center center no-repeat;
   display: flex;
   justify-content: space-around;
   align-items: center;
`

const Home = () => {
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

export default Home
