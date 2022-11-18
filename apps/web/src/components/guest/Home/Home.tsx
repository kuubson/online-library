import styled from 'styled-components/macro'

import { history, t } from '@online-library/core'

import { queries } from 'styles'
import { RoleContainer } from 'styles/styled'

import * as Styled from './styled'

import { MobileImage } from 'components/shared'

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
            <MobileImage onlyBadges />
         </Styled.HeaderContainer>
         <MobileImage />
         <Styled.Advantages>
            <Styled.Advantage>{t('home.advantage1')}</Styled.Advantage>
            <Styled.Advantage>{t('home.advantage2')}</Styled.Advantage>
            <Styled.Advantage>{t('home.advantage3')}</Styled.Advantage>
            <Styled.Advantage>{t('home.advantage4')}</Styled.Advantage>
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
