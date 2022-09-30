import styled from 'styled-components/macro'

import { history, t } from '@online-library/core'

import * as Styled from './styled'

import { useAccountActivation } from './hooks'

export const Home = () => {
   useAccountActivation()
   return (
      <HomeContainer>
         <Styled.HeaderContainer>
            <Styled.Header>Online Library</Styled.Header>
            <Styled.Buttons>
               <Styled.Button onClick={() => history.push('/login')}>
                  {t('buttons.login')}
               </Styled.Button>
               <Styled.Button onClick={() => history.push('/registration')}>
                  {t('buttons.register')}
               </Styled.Button>
            </Styled.Buttons>
         </Styled.HeaderContainer>
         <Styled.AdvantagesContainer>
            <Styled.Advantage>{t('home.advantage1')}</Styled.Advantage>
            <Styled.Advantage>{t('home.advantage2')}</Styled.Advantage>
            <Styled.Advantage>{t('home.advantage3')}</Styled.Advantage>
         </Styled.AdvantagesContainer>
      </HomeContainer>
   )
}

const HomeContainer = styled.section`
   width: 100%;
   height: 100%;
   display: flex;
   justify-content: space-around;
   align-items: center;
`
